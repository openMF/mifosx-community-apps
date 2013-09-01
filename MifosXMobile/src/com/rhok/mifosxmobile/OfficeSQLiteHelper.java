package com.rhok.mifosxmobile;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class OfficeSQLiteHelper extends SQLiteOpenHelper {

	public static final String TABLE_OFFICES = "offices";
	public static final String COLUMN_ID = "_id";
	public static final String COLUMN_OFFICE_ID = "officeid";
	public static final String COLUMN_NAME = "name";
	public static final String COLUMN_NAME_DECORATED = "namedecorated";
	
	private static final String DATABASE_NAME = "offices.db";
	private static final int DATABASE_VERSION = 1; 
	
	private static final String DATABASE_CREATE = "create table " + TABLE_OFFICES + "("
			+ COLUMN_ID + " integer primary key autoincrement, " + COLUMN_OFFICE_ID
			+ " text not null, " + COLUMN_NAME + " text not null, " + COLUMN_NAME_DECORATED
			+ " text not null);";
	
	public OfficeSQLiteHelper(Context context, String name, CursorFactory factory,
			int version) {
		super(context, name, factory, version);
	}

	@Override
	public void onCreate(SQLiteDatabase db) {
		db.execSQL(DATABASE_CREATE);

	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		Log.w(OfficeSQLiteHelper.class.getName(), "Upgrading database from version " + oldVersion + " to " 
				+ newVersion + ", which will destroy all old data."); 
		db.execSQL("DROP TABLE IF EXISTS " + TABLE_OFFICES);
		onCreate(db); 

	}

}
