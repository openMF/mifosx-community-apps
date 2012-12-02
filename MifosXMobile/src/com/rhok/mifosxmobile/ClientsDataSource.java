package com.rhok.mifosxmobile;

import java.util.ArrayList;
import java.util.List;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

public class ClientsDataSource {

	private SQLiteDatabase database;
	private ClientSQLiteHelper dbHelper;
	private String[] allColumns = { 
			ClientSQLiteHelper.COLUMN_ID,
			ClientSQLiteHelper.COLUMN_CLIENT_ID,
			ClientSQLiteHelper.COLUMN_OFFICE_ID,
			ClientSQLiteHelper.COLUMN_FIRST_NAME,
			ClientSQLiteHelper.COLUMN_LAST_NAME,
			ClientSQLiteHelper.COLUMN_JOINED_DATE,
			ClientSQLiteHelper.COLUMN_EXISTS_ON_SERVER
	};
	
	public ClientsDataSource(Context context) {
		dbHelper = new ClientSQLiteHelper(context, ClientSQLiteHelper.TABLE_CLIENTS, null, 2); 
	}
	
	
	public void open() throws SQLException {
		database = dbHelper.getWritableDatabase();
	}
	
	public void close() {
		dbHelper.close();
	}
	
	public void destroy() {
		dbHelper.onUpgrade(database, 3, 4); 
	}
	
	public Client createClient(String ClientId, String officeId, String firstName, String lastName, String joinedDate, boolean existsOnServer) {
		ContentValues values = new ContentValues();
		values.put(ClientSQLiteHelper.COLUMN_CLIENT_ID, ClientId);
		values.put(ClientSQLiteHelper.COLUMN_OFFICE_ID, officeId);
		values.put(ClientSQLiteHelper.COLUMN_FIRST_NAME, firstName);
		values.put(ClientSQLiteHelper.COLUMN_LAST_NAME, lastName);
		values.put(ClientSQLiteHelper.COLUMN_JOINED_DATE, joinedDate);
		values.put(ClientSQLiteHelper.COLUMN_EXISTS_ON_SERVER, existsOnServer); 
		
		long insertId = database.insert(ClientSQLiteHelper.TABLE_CLIENTS, null, values); 
		Cursor cursor = database.query(ClientSQLiteHelper.TABLE_CLIENTS, allColumns, 
				ClientSQLiteHelper.COLUMN_ID + " = " + insertId, null, null, null, null);
		cursor.moveToFirst();
		Client newClient= cursorToClient(cursor);
		cursor.close();
		return newClient; 
	}
	
	public long addClient(Client client) {
		ContentValues values = new ContentValues();
		values.put(ClientSQLiteHelper.COLUMN_CLIENT_ID, client.getClientId());
		values.put(ClientSQLiteHelper.COLUMN_OFFICE_ID, client.getOfficeId());
		values.put(ClientSQLiteHelper.COLUMN_FIRST_NAME, client.getFirstName());
		values.put(ClientSQLiteHelper.COLUMN_LAST_NAME, client.getLastName());
		values.put(ClientSQLiteHelper.COLUMN_JOINED_DATE, client.getJoinedDate());
		values.put(ClientSQLiteHelper.COLUMN_EXISTS_ON_SERVER, client.isExistsOnServer()); 
		
		long insertId = database.insert(ClientSQLiteHelper.TABLE_CLIENTS, null, values); 
		
		return insertId; 
	}
	
	public void deleteClient(Client client) {
		String id = client.getKeyId();
		Log.i("ClientsDataSource", "Client deleted with id: " + id);
		database.delete(ClientSQLiteHelper.TABLE_CLIENTS, ClientSQLiteHelper.COLUMN_OFFICE_ID + " = '" + id + "'", null); 
	}
	
	public void deleteClient(String id) {
		Log.i("ClientsDataSource", "Client deleted with id: " + id);
		database.delete(ClientSQLiteHelper.TABLE_CLIENTS, ClientSQLiteHelper.COLUMN_OFFICE_ID + " = '" + id + "'", null);
	}
	
	public void deleteAllClients() {
		
		Cursor cursor = database.query(ClientSQLiteHelper.TABLE_CLIENTS, 
				allColumns, null, null, null, null, null);
		while (!cursor.isAfterLast()) {
			deleteClient(cursor.getString(0)); 
		}
		cursor.close(); 
	}
	
	public List<Client> getAllClients() {
		List<Client> clients = new ArrayList<Client>();
		
		Cursor cursor = database.query(ClientSQLiteHelper.TABLE_CLIENTS, 
				allColumns, null, null, null, null, null);
		
		cursor.moveToFirst();
		while (!cursor.isAfterLast()) {
			Client client = cursorToClient(cursor);
			clients.add(client);
			cursor.moveToNext();
		}
		// Make sure to close the Cursor
		cursor.close();
		return clients; 
	}
	
	public List<Client> getAllNewClients() {
		List<Client> clients = new ArrayList<Client>();
		
		Cursor cursor = database.query(ClientSQLiteHelper.TABLE_CLIENTS, 
				allColumns, ClientSQLiteHelper.COLUMN_EXISTS_ON_SERVER + " = 0 ", null, null, null, null);
		
		cursor.moveToFirst();
		while (!cursor.isAfterLast()) {
			Client client = cursorToClient(cursor);
			clients.add(client);
			cursor.moveToNext();
		}
		// Make sure to close the Cursor
		cursor.close();
		return clients;
	}
	
	public boolean containsClientId(String clientId) {
		Cursor cursor = database.query(ClientSQLiteHelper.TABLE_CLIENTS,
				allColumns, ClientSQLiteHelper.COLUMN_CLIENT_ID + " = " + clientId, null, null, null, null);
		int count = 0; 
		while (!cursor.isAfterLast()) {
			count++;
			cursor.moveToNext();
		}
		
		cursor.close(); 
		Log.i("containsClientId", "Count is " + count); 
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	
	public void setExistsOnServer(String tableId, String clientId) {
		Cursor cursor = database.query(ClientSQLiteHelper.TABLE_CLIENTS,
				allColumns, ClientSQLiteHelper.COLUMN_ID + " = " + tableId, null, null, null, null);
		cursor.moveToFirst();
		Client client = cursorToClient(cursor); 
		
		String strFilter = "_id = " + tableId; 
		ContentValues values = new ContentValues();
		values.put(ClientSQLiteHelper.COLUMN_ID, client.getKeyId());
		values.put(ClientSQLiteHelper.COLUMN_CLIENT_ID, clientId);
		values.put(ClientSQLiteHelper.COLUMN_OFFICE_ID, client.getOfficeId());
		values.put(ClientSQLiteHelper.COLUMN_FIRST_NAME, client.getFirstName());
		values.put(ClientSQLiteHelper.COLUMN_LAST_NAME, client.getLastName());
		values.put(ClientSQLiteHelper.COLUMN_JOINED_DATE, client.getJoinedDate());
		values.put(ClientSQLiteHelper.COLUMN_EXISTS_ON_SERVER, true); // Important line here 
		database.update(ClientSQLiteHelper.TABLE_CLIENTS, values, strFilter, null);
		
		cursor.close();
	}
	
	private Client cursorToClient(Cursor cursor) {
		Client client = new Client();
		for (String string: cursor.getColumnNames()) {
			Log.i("cursorToClient", string);
		}
		client.setKeyId(cursor.getString(0));
		client.setClientId(cursor.getString(1));
		client.setOfficeId(cursor.getString(2));
		client.setFirstName(cursor.getString(3)); 
		client.setLastName(cursor.getString(4));
		client.setJoinedDate(cursor.getString(5));
		client.setExistsOnServer(cursor.getInt(6) > 0);
		Log.i("cursorToClient", "Existsonserver value = " + cursor.getInt(6)); 
		
		return client;
	}
}
