package com.rhok.mifosxmobile;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class ClientSQLiteHelper extends SQLiteOpenHelper {

	public static final String TABLE_CLIENTS = "clients";
	public static final String COLUMN_ID = "_id";
	public static final String COLUMN_CLIENT_ID = "clientid";
	public static final String COLUMN_OFFICE_ID = "officeid"; 
	 
	public static final String COLUMN_FIRST_NAME = "firstname";
	public static final String COLUMN_LAST_NAME= "lastname";
	public static final String COLUMN_JOINED_DATE= "datejoined";
	public static final String COLUMN_EXISTS_ON_SERVER= "existsonserver";
	
	private static final String DATABASE_NAME = "clients.db";
	private static final int DATABASE_VERSION = 3; 
	
	private static final String DATABASE_CREATE = "create table " + TABLE_CLIENTS + "("
			+ COLUMN_ID + " integer primary key autoincrement, "
			+ COLUMN_CLIENT_ID + " text not null, " 
			+ COLUMN_OFFICE_ID	+ " text not null, " 
			+ COLUMN_FIRST_NAME + " text not null, " 
			+ COLUMN_LAST_NAME	+ " text not null, " 
			+ COLUMN_JOINED_DATE + " text not null, " 
			+ COLUMN_EXISTS_ON_SERVER + " boolean not null);";
	
	
	public ClientSQLiteHelper(Context context, String name,
			CursorFactory factory, int version) {
		super(context, name, factory, version);
	}

	@Override
	public void onCreate(SQLiteDatabase db) {
		db.execSQL(DATABASE_CREATE);
	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		Log.w(ClientSQLiteHelper.class.getName(), "Upgrading database from version " + oldVersion + " to " 
				+ newVersion + ", which will destroy all old data."); 
		db.execSQL("DROP TABLE IF EXISTS " + TABLE_CLIENTS);
		onCreate(db); 
		
	}

}
