package com.rhok.mifosxmobile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class LoginActivity extends Activity {
	
	private Button mLoginBtn;
	private Button mQuickLoginBtn;
	
	private ProgressDialog mProgressDialog;
	
	private SharedPreferences mPrefs;
	private SharedPreferences.Editor mPrefsEditor; 
	
	private final static String DEMO_USERNAME = "mifos";
	private final static String DEMO_PASSWORD = "password";
	protected final static String PREFS_FILE = "mifosAppPrefs";
	protected final static String USER_CREDENTIALS_HASH = "userCredentialsHash";
	protected final static String USER_AUTHENTICATION_KEY= "userAuthorisationKey";
	private final static String INCORRECT_DETAILS = "Incorrect username or password.";
	private final static String NEED_ONLINE_AUTH_FIRST = "You must authenticate username and password online before you can do it ffline.";
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        
        // Get shared preferences and editor
        mPrefs = getSharedPreferences(PREFS_FILE, 0);
        mPrefsEditor = mPrefs.edit(); 
        
        mLoginBtn = (Button) findViewById(R.id.login_btn);
        mQuickLoginBtn = (Button) findViewById(R.id.quick_login_btn);

        mLoginBtn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				String username = ((EditText) findViewById(R.id.username_input_txt)).getText().toString();
				String password = ((EditText) findViewById(R.id.password_input_txt)).getText().toString();
				login(username, password);
			}
        });
        
        mQuickLoginBtn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				login(DEMO_USERNAME, DEMO_PASSWORD);
			}
        });
        
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_login, menu);
        return true;
    }
    
    public void login(String username, String password) {
    	try {
    		new AuthenticateTask().execute(username, password); 
    	} catch (Exception e) {
    		e.printStackTrace();
    	}
    }
    
    private class AuthenticateTask extends AsyncTask<String, Void, String> {

    	private User authenticatedUser; 
    	private String username;
    	private String password;
    	
		@Override
		protected void onPreExecute() {
			super.onPreExecute();
			
			mProgressDialog = new ProgressDialog(LoginActivity.this); 
			mProgressDialog.setMessage("Authenticating...");
			mProgressDialog.show();
		}

		@Override
		protected String doInBackground(String... params) {
			username = params[0];
			password = params[1];
			
			if (isNetworkAvailable()) {
				return callAuthenticationApi(username, password);
			} else {
				// check hash of username and password against stored hash
				// 		first check if there is a stored hash
				if (mPrefs.contains(USER_CREDENTIALS_HASH)) {
					if (mPrefs.getString(USER_CREDENTIALS_HASH, null).equals(md5(username + password))) {
						// return user profile
						Log.i("doInBackground", "Returning stored authentication key after hash validation.");
						return mPrefs.getString(USER_AUTHENTICATION_KEY, null);
					} else {
						return INCORRECT_DETAILS;
					}
				} else {
					return NEED_ONLINE_AUTH_FIRST; 
				}
			}
			
		}
		
		@Override
		protected void onPostExecute(String result) {
			super.onPostExecute(result);
			
			if (mProgressDialog.isShowing()) {
				mProgressDialog.dismiss();
			}

			if (result.equals(INCORRECT_DETAILS) || result.equals(NEED_ONLINE_AUTH_FIRST)) {
				Toast.makeText(LoginActivity.this, result, Toast.LENGTH_LONG).show();
			} else {
				Log.i("onPostExecute", "Saving user credentials and authentication key to shared preferences."); 
				// Save a hash of the authenticated username and password to shared preferences, for offline authentication
				mPrefsEditor.putString(USER_CREDENTIALS_HASH, md5(username + password));
				// Save the authentication key
				mPrefsEditor.putString(USER_AUTHENTICATION_KEY, result); 
				mPrefsEditor.commit(); 
				
				// Start the ClientListActivity
				Intent intent = new Intent(LoginActivity.this, ClientListActivity.class); 
				startActivity(intent); 
			}
		}

	    public String callAuthenticationApi(String username, String password) {
	    	
	    	StringBuilder builder = new StringBuilder();
	    	HttpClient client = new DefaultHttpClient();
	    	
	    	String authenticateRootUrl = "https://demo.openmf.org/mifosng-provider/api/v1/authentication?tenantIdentifier=default&username=";
	    	String passwordLabel = "&password=";
	    	
	    	HttpPost httpPost = new HttpPost(authenticateRootUrl + username + passwordLabel + password); 
	    	Log.i("callAuthenticateApi", "Calling " + httpPost.getURI());
	    	
	    	try {
	    		HttpResponse response = client.execute(httpPost);
	    		StatusLine statusLine = response.getStatusLine();
	    		int statusCode = statusLine.getStatusCode();
	    		if (statusCode == 200) {
	    			HttpEntity entity = response.getEntity();
	    			InputStream content = entity.getContent();
	    			
	    			BufferedReader reader = new BufferedReader(new InputStreamReader(content));
	    			String line;
	    			while ((line = reader.readLine()) != null) {
	    				builder.append(line);
	    			}
	    		} else {
	    			Log.e("callAuthenticateAPI", "Failed to download file");
	    		}
	    	} catch (ClientProtocolException e) {
	    		e.printStackTrace();
	    	} catch (IOException e) {
	    		e.printStackTrace();
	    	}
	    	return readJsonUser(builder.toString()); 
	    }
	    
	    public String readJsonUser (String jsonText) {
	    	Log.i("readJsonUser", "result is \r\n" + jsonText);
	    	// Create new User object 
	    	User user = new User();
	    	// Populate user object
	    	try {
	    		/** 
	    		 * For now we're not going to deal with the whole User object - just stick with Authentication Key and ignore the rest for now.
	    		 */
	    		JSONObject userObject = new JSONObject(jsonText);
	    		user.setUsername(userObject.getString("username"));
	    		user.setAuthenticated(userObject.getBoolean("authenticated"));
	    		user.setBase64AuthenticationKey(userObject.getString("base64EncodedAuthenticationKey"));
	    		user.setUserId(userObject.getString("userId"));
	    		// Loop through permissions
	    		JSONArray permissionsArray = userObject.getJSONArray("permissions");
	    		String[] userPermissions = new String[permissionsArray.length()];
	    		for (int i = 0; i < permissionsArray.length(); i++) {
	    			userPermissions[i] = (String) permissionsArray.get(i); 
	    		}
	    		user.setPermissions(userPermissions);

	    		authenticatedUser = user;
	    		
	    		return user.getBase64AuthenticationKey(); 
	    		
	    	} catch (JSONException e) {
	    		e.printStackTrace();
	    		return null; 
	    	}
	    }
    
	    public String md5(String s) {
	    	// Method for getting an md5 hash of a string. 
	    	
	    	String retval = "";
	    	
	    	try {
	    		// Create MD5 Hash
	    		MessageDigest digest = MessageDigest.getInstance("MD5"); 
	    		digest.update(s.getBytes("UTF-8")); 
	    		byte[] messageDigest = digest.digest(); 
	    		
	    		// Create Hex String
	    		StringBuffer hexString = new StringBuffer();
	    		for (int i = 0; i < messageDigest.length; i++) {
	    			hexString.append(Integer.toHexString(0xFF & messageDigest[i]));
	    		}
	    		retval =  hexString.toString();
	    	} catch (NoSuchAlgorithmException e) {
	    			e.printStackTrace();
	    	} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
			}
	    	
	    	return retval; 
	    }

	    public boolean isNetworkAvailable(){
	    	ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);    	

	    	NetworkInfo wifiNetwork = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
	    	if (wifiNetwork != null && wifiNetwork.isConnected()) {
	    		return true;
	    	}

	    	NetworkInfo mobileNetwork = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);
	    	if (mobileNetwork != null && mobileNetwork.isConnected()) {
	    		return true;
	    	}

	    	NetworkInfo activeNetwork = connectivityManager.getActiveNetworkInfo();
	    	if (activeNetwork != null && activeNetwork.isConnected()) {
	    		return true;
	    	}
	    	return false;
	    }
	    
    }

}
