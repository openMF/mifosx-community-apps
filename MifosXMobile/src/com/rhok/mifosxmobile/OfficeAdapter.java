package com.rhok.mifosxmobile;

import java.util.List;

import android.content.Context;
import android.database.DataSetObserver;
import android.view.View;
import android.view.ViewGroup;
import android.widget.SpinnerAdapter;
import android.widget.TextView;

public class OfficeAdapter implements SpinnerAdapter {

	private List<Office> mOfficeList;
	private Context context;
	
	public OfficeAdapter(List<Office> officeList, Context context) {
		this.mOfficeList = officeList;
		this.context = context; 
	}
	
	
	@Override
	public int getCount() {
		return mOfficeList.size(); 
	}

	@Override
	public Object getItem(int position) {
		return mOfficeList.get(position); 
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	@Override
	public int getItemViewType(int position) {
		return android.R.layout.simple_spinner_dropdown_item; 
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		TextView v = new TextView(context); 
		v.setText(mOfficeList.get(position).getName());
		
		return v; 
	}

	@Override
	public int getViewTypeCount() {
		return 1; 
	}

	@Override
	public boolean hasStableIds() {
		return false;
	}

	@Override
	public boolean isEmpty() {
		return false;
	}

	@Override
	public void registerDataSetObserver(DataSetObserver observer) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void unregisterDataSetObserver(DataSetObserver observer) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public View getDropDownView(int position, View convertView, ViewGroup parent) {
		return this.getView(position, convertView, parent);
	}

}
