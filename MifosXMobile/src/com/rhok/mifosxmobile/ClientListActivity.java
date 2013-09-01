package com.rhok.mifosxmobile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ListView;

public class ClientListActivity extends Activity {

	private Button mCreateClientBtn;
	private Button mUploadClientBtn; 
	private Button mDeleteOfficesBtn;
	private ProgressDialog mProgressDialog; 
	private ListView mClientListView; 
	private Context mContext; 
	
	private List<Client> clientList;
	private List<Office> mOfficeList; 
	private OfficesDataSource mOfficesDataSource;
	private ClientsDataSource mClientsDataSource; 
	
	private static final String DEMO_DOMAIN_URL = "https://demo.openmf.org/mifosng-provider/api/v1/"; 
	private static final String CLIENTS_API_CALL = "clients";
	private static final String CLIENTS_TEMPLATE_API_CALL = "clients/template"; 
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_client_list);
		mContext = this;  
		
		mClientsDataSource = new ClientsDataSource(mContext);
		mOfficesDataSource = new OfficesDataSource(mContext);
		
		mClientListView = (ListView) findViewById(R.id.list); 
		
		mCreateClientBtn = (Button) findViewById(R.id.create_client_btn);
		mCreateClientBtn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent(ClientListActivity.this, CreateClientActivity.class); 
				startActivity(intent); 
			}
		});
		
		mUploadClientBtn = (Button) findViewById(R.id.upload_clients_btn); 
		mUploadClientBtn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
//				new DownloadTemplateTask().execute(); 
				new UploadClientTask().execute(); 
			}
		});
		
		// TODO When is the best time for this to execute?
		if (isNetworkAvailable()){ 
			new DownloadOfficesTask().execute();
			new RetrieveClientsTask().execute();
		}
		
		mDeleteOfficesBtn = (Button) findViewById(R.id.delete_offices_btn);
		mDeleteOfficesBtn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				mOfficesDataSource = new OfficesDataSource(mContext);
				mOfficesDataSource.open(); 
				for (Office office: mOfficesDataSource.getAllOffices()) {
					mOfficesDataSource.deleteOffice(office); 
				}
				mOfficesDataSource.close(); 
			}
		});

	}
	

	@Override
	protected void onResume() {
		super.onResume();
		// Retrieve clients from database, get handle on ListView, show clients in new adapter
		mClientsDataSource.open(); 
		clientList = mClientsDataSource.getAllClients();
		
		mClientListView.setAdapter(new ClientAdapter(clientList, this));
	}

	@Override
	protected void onPause() {
		super.onPause();
		
//		mClientsDataSource.close();
	}

	private class DownloadOfficesTask extends AsyncTask<Void, Void, List<Office>> {
		
		@Override
		protected void onPreExecute() {
			super.onPreExecute();
			
			mOfficesDataSource.open(); 
		}
		
		@Override
		protected List<Office> doInBackground(Void... params) {
			return callClientTemplateApi(); 
		}
		
		@Override
		protected void onPostExecute(List<Office> result) {
			super.onPostExecute(result);
			
			mOfficesDataSource.close(); 
			mOfficeList = result; 
		}

		public List<Office> callClientTemplateApi() {

			StringBuilder builder = new StringBuilder();
			HttpClient client = new DefaultHttpClient();

			HttpGet httpGet = new HttpGet(DEMO_DOMAIN_URL + CLIENTS_TEMPLATE_API_CALL);
			httpGet.setHeader("X-Mifos-Platform-TenantId", "default"); 
			// Read authentication key out of shared preferences and set as a header 
			SharedPreferences prefs = getSharedPreferences(LoginActivity.PREFS_FILE, 0);
			httpGet.setHeader("Authorization", "Basic " + prefs.getString(LoginActivity.USER_AUTHENTICATION_KEY, null)); 
			Log.i("callClientTemplateApi", "Calling " + httpGet.getURI());

			try {
				HttpResponse response = client.execute(httpGet);
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
					Log.e("callClientTemplateAPI", "Failed to download file");
				}
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return readAllowedOffices(builder.toString()); 
		}

		public List<Office> readAllowedOffices (String jsonText) {
			Log.i("readAllowedOffices", "result is \r\n" + jsonText);

			try {
				JSONObject templateObject = new JSONObject(jsonText); 
				JSONArray jsonOffices = templateObject.getJSONArray("allowedOffices"); 
				Log.i("readAllowedOffices", "Number of Offices:" + jsonOffices.length()); 
				mOfficeList = new ArrayList<Office>(jsonOffices.length()); 

				for (int i = 0; i < jsonOffices.length(); i++) {
					JSONObject officeObject = jsonOffices.getJSONObject(i);
					String officeId = officeObject.getString("id");
					String name = officeObject.getString("name");

					if (!mOfficesDataSource.containsOfficeId(officeId)) {
						mOfficeList.add(mOfficesDataSource.createOffice(officeId, name, "")); 
						Log.i("readAllowedOffices", "Adding office " + officeId + ", " + name);
					} else {
						Log.i("readAllowedOffices", "Office table already contains office " + officeId + ", " + name); 
					}

				}

			} catch (JSONException e) {
				e.printStackTrace();
				return null; 
			}

			return mOfficeList; 
		}

	}
	
	private class UploadClientTask extends AsyncTask <Void, Void, Void>{

		@Override
		protected void onPreExecute() {
			super.onPreExecute();
			
			mProgressDialog = new ProgressDialog(mContext);
			mProgressDialog.setMessage("Uploading client data...");
			mProgressDialog.show(); 
		}

		@Override
		protected Void doInBackground(Void... params) {
			mClientsDataSource.open();
			List<Client> newClients = mClientsDataSource.getAllNewClients();
			for (Client client: newClients) {
				callAddClientApi(client);
				Log.i("uploadClientTask", "Uploading client " + client.getFirstName() + " " + client.getLastName()); 
			}
			return null;  
		}
		
		@Override
		protected void onPostExecute(Void result) {
			super.onPostExecute(result);
			
			if (mProgressDialog.isShowing()) {
				mProgressDialog.dismiss(); 
			}
		}
		
		public int callAddClientApi(Client client) {

			StringBuilder builder = new StringBuilder();
			HttpClient httpClient = new DefaultHttpClient();

			HttpPost httpPost = new HttpPost(DEMO_DOMAIN_URL + CLIENTS_API_CALL);
			httpPost.setHeader("X-Mifos-Platform-TenantId", "default"); 
			// Read authentication key out of shared preferences and set as a header 
			SharedPreferences prefs = getSharedPreferences(LoginActivity.PREFS_FILE, 0);
			httpPost.setHeader("Authorization", "Basic " + prefs.getString(LoginActivity.USER_AUTHENTICATION_KEY, null));
			httpPost.setHeader("Accept", "application/json");
			httpPost.setHeader("Content-type", "application/json");
			Log.i("callAddClientApi", "Calling " + httpPost.getURI());
			
			JSONObject clientJson = writeClientJson(client); 

			try {
				StringEntity jsonEntity = new StringEntity(clientJson.toString());
				Log.i("callAddClientApi", "jsonEntity is " + clientJson.toString());
				httpPost.setEntity(jsonEntity); 
				Log.i("callAddClientApi", "httpPost is " + httpPost.toString()); 
				HttpResponse response = httpClient.execute(httpPost);
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
					
					//  update the database record of the Client to say that it now exists on the server
					mClientsDataSource.setExistsOnServer(client.getKeyId(), "" + readUploadedClientId(builder.toString())); 
					Log.i("uploadClientTask", "Setting 'existsOnServer' on client " + client.getFirstName() + " " +  client.getLastName());
				} else {
					Log.e("callAddClientApi", "Failed to download file, status code is " + statusCode + ", " + statusLine.getReasonPhrase());
				}
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return readUploadedClientId(builder.toString()); 
		}
		
		public JSONObject writeClientJson(Client client) {
			JSONObject clientJson = new JSONObject();
			try {
				clientJson.put("officeId", client.getOfficeId());
				clientJson.put("firstname", client.getFirstName());
				clientJson.put("lastname", client.getLastName());
				clientJson.put("dateFormat", "dd MMMM yyyy");
				clientJson.put("joiningDate", client.getJoinedDate()); 
				clientJson.put("locale", "en"); 
			} catch (JSONException e) {
				e.printStackTrace();
			}
			return clientJson; 
		}
		
		private int readUploadedClientId(String jsonText) {
			Log.i("readUploadedClientId", "result is \r\n" + jsonText);

			int entityId = -1; 
			try {
				JSONObject responseObject = new JSONObject(jsonText); 
				Log.i("readUploadedClientID", "entityId is " + responseObject.getString("entityId"));
				entityId = Integer.parseInt(responseObject.getString("entityId"));
				
			} catch (JSONException e) {
				e.printStackTrace();
			}
			return entityId; 
		}
		
	}
	
	private class RetrieveClientsTask extends AsyncTask {
		
		@Override
		protected void onPreExecute() {
			super.onPreExecute();
			
			mClientsDataSource.open(); 
			mProgressDialog = new ProgressDialog(mContext);
			mProgressDialog.setMessage("Downloading clients...");
			mProgressDialog.show(); 
		}

		@Override
		protected Void doInBackground(Object... params) {
			List<Client> newClients = callClientsApi(); 
			for (Client client : newClients) {
				clientList.add(client); 
			}
			return null;
		}

		@Override
		protected void onPostExecute(Object result) {
			super.onPostExecute(result);
			
			if (mProgressDialog.isShowing()) {
				mProgressDialog.dismiss(); 
			}
			onResume(); 
		}
		
		public List<Client> callClientsApi() {

			StringBuilder builder = new StringBuilder();
			HttpClient client = new DefaultHttpClient();

			HttpGet httpGet = new HttpGet(DEMO_DOMAIN_URL + CLIENTS_API_CALL);
			httpGet.setHeader("X-Mifos-Platform-TenantId", "default"); 
			// Read authentication key out of shared preferences and set as a header 
			SharedPreferences prefs = getSharedPreferences(LoginActivity.PREFS_FILE, 0);
			httpGet.setHeader("Authorization", "Basic " + prefs.getString(LoginActivity.USER_AUTHENTICATION_KEY, null)); 
			Log.i("callClientsApi", "Calling " + httpGet.getURI());

			try {
				HttpResponse response = client.execute(httpGet);
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
					Log.e("callClientsAPI", "Failed to download file");
				}
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return readJsonClients(builder.toString()); 
		}

		public List<Client> readJsonClients(String jsonText) {
			Log.i("readJsonClients", "result is \r\n" + jsonText);
			List<Client> downloadedClients; 
			try { 
				JSONArray jsonClients = new JSONArray(jsonText); 
				Log.i("readClients", "Number of Clients:" + jsonClients.length()); 
				downloadedClients = new ArrayList<Client>(jsonClients.length()); 

				for (int i = 0; i < jsonClients.length(); i++) {
					JSONObject clientObject = jsonClients.getJSONObject(i);
					String clientId = "";
					if (clientObject.has("id")) {
						clientId = clientObject.getString("id");
					}
					String officeId = ""; 
					if (clientObject.has("officeId")) {
						officeId = clientObject.getString("officeId");
					}
					String firstname = ""; 
					if (clientObject.has("firstname")) {
						firstname = clientObject.getString("firstname");
					}
					String lastname = ""; 
					if (clientObject.has("lastname")) {
						lastname = clientObject.getString("lastname");
					}
					JSONArray dateParts = clientObject.getJSONArray("joinedDate");
					String joinedDate = dateParts.getString(2) + " " + dateParts.getString(1) + " " + dateParts.getString(0);  
					
					if (!mClientsDataSource.containsClientId(clientId)) {
						Log.i("readJsonClients", "Adding client " + firstname + " " + lastname); 
						downloadedClients.add(mClientsDataSource.createClient(clientId, officeId, firstname, lastname, joinedDate, true));
					}
				}
			} catch (JSONException e) {
				e.printStackTrace();
				return null; 
			}

			return downloadedClients; 
		}
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
