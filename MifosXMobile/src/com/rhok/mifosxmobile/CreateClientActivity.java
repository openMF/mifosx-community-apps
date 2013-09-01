package com.rhok.mifosxmobile;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

public class CreateClientActivity extends Activity {

	private Spinner mOfficeSpinner;
	private List<Office> mOfficeList;
	private OfficesDataSource mOfficesDataSource;
	private ClientsDataSource mClientsDataSource; 
	private Button mSaveBtn;
	private Context mContext; 
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_create_client);
		
		mContext = this; 
		
		mOfficesDataSource = new OfficesDataSource(this); 
		mOfficesDataSource.open();
		mOfficeList = mOfficesDataSource.getAllOffices();
		mOfficesDataSource.close(); 
		
		mOfficeSpinner = (Spinner) findViewById(R.id.office_spinner);	
		
		OfficeAdapter officeAdapter = new OfficeAdapter(mOfficeList, this); 
		mOfficeSpinner.setAdapter(officeAdapter); 
		
		mSaveBtn = (Button) findViewById(R.id.save_client_btn); 
		mSaveBtn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				Calendar calendar = Calendar.getInstance(); 
				String firstName = ((EditText)findViewById(R.id.first_name_input)).getText().toString();
				String lastName = ((EditText)findViewById(R.id.surname_input)).getText().toString();
				String officeId = ((Office) mOfficeSpinner.getSelectedItem()).getId(); 
				String joinedDate =(calendar.get(Calendar.DAY_OF_MONTH)
						+ " " + calendar.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.US)
						+ " " + calendar.get(Calendar.YEAR));
				Log.i("mSaveBtnClick", "Client saved with name " + firstName + " " + lastName + ", joined on " + joinedDate);
				
				mClientsDataSource = new ClientsDataSource(mContext);
				mClientsDataSource.open(); 
				mClientsDataSource.createClient("", officeId, firstName, lastName, joinedDate, false);
				mClientsDataSource.close(); 
				
				finish(); 
			}
		});
	}

	
}
