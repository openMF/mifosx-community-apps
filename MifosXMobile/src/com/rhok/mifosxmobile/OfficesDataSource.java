package com.rhok.mifosxmobile;

import java.util.ArrayList;
import java.util.List;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

public class OfficesDataSource {

	private SQLiteDatabase database;
	private OfficeSQLiteHelper dbHelper;
	private String[] allColumns = { 
			OfficeSQLiteHelper.COLUMN_ID,
			OfficeSQLiteHelper.COLUMN_OFFICE_ID,
			OfficeSQLiteHelper.COLUMN_NAME,
			OfficeSQLiteHelper.COLUMN_NAME_DECORATED
	};
	
	public OfficesDataSource(Context context) {
		dbHelper = new OfficeSQLiteHelper(context, OfficeSQLiteHelper.TABLE_OFFICES, null, 1); // TODO not sure about factory and int here
	}
	
	public void open() throws SQLException {
		database = dbHelper.getWritableDatabase();
	}
	
	public void close() {
		dbHelper.close();
	}
	
	public Office createOffice(String id, String name, String decName) {
		ContentValues values = new ContentValues();
		values.put(OfficeSQLiteHelper.COLUMN_OFFICE_ID, id);
		values.put(OfficeSQLiteHelper.COLUMN_NAME, name);
		values.put(OfficeSQLiteHelper.COLUMN_NAME_DECORATED, decName);
		
		long insertId = database.insert(OfficeSQLiteHelper.TABLE_OFFICES, null, values); 
		Cursor cursor = database.query(OfficeSQLiteHelper.TABLE_OFFICES, allColumns, 
				OfficeSQLiteHelper.COLUMN_ID + " = " + insertId, null, null, null, null);
		cursor.moveToFirst();
		Office newOffice = cursorToOffice(cursor);
		cursor.close();
		return newOffice; 
	}
	
	public void deleteOffice(Office office) {
		String id = office.getId();
		Log.i("OfficesDataSource", "Office deleted with id: " + id);
		database.delete(OfficeSQLiteHelper.TABLE_OFFICES, OfficeSQLiteHelper.COLUMN_OFFICE_ID + " = '" + id + "'", null); 
	}
	
	public List<Office> getAllOffices() {
		List<Office> offices = new ArrayList<Office>();
		
		Cursor cursor = database.query(OfficeSQLiteHelper.TABLE_OFFICES, 
				allColumns, null, null, null, null, null);
		
		cursor.moveToFirst();
		while (!cursor.isAfterLast()) {
			Office office = cursorToOffice(cursor);
			offices.add(office);
			cursor.moveToNext();
		}
		// Make sure to close the Cursor
		cursor.close();
		return offices; 
	}
	
	public boolean containsOfficeId(String officeId) {
		Cursor cursor = database.query(OfficeSQLiteHelper.TABLE_OFFICES,
				allColumns, OfficeSQLiteHelper.COLUMN_OFFICE_ID + " = " + officeId, null, null, null, null);
		int count = 0; 
		while (!cursor.isAfterLast()) {
			count++;
			cursor.moveToNext();
		} 
		Log.i("containsOfficeId", "Count is " + count); 
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	private Office cursorToOffice(Cursor cursor) {
		Office office = new Office();
		// Column 0 is the auto-incrementing id which we may not need - here we're only concerned with its
		// office id, so we skip 0. 
		office.setId(cursor.getString(1));
		office.setName(cursor.getString(2)); 
		office.setNameDecorated(cursor.getString(3)); 
		
		return office;
	}
	
}
