package com.rhok.mifosxmobile;

import java.util.List;

import android.content.Context;
import android.database.DataSetObserver;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListAdapter;
import android.widget.TextView;

public class ClientAdapter implements ListAdapter{

	private List<Client> mClients;
	private Context mContext; 
	
	public ClientAdapter(List<Client> clients, Context context) {
		mClients = clients;
		mContext = context; 
	}
	
	@Override
	public int getCount() {
		return mClients.size();
	}

	@Override
	public Object getItem(int position) {
		return mClients.get(position);
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	@Override
	public int getItemViewType(int position) {
		return android.R.layout.activity_list_item; 
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		TextView v = new TextView(mContext);
		v.setText(mClients.get(position).getFirstName() + " " + mClients.get(position).getLastName()); 
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
	public boolean areAllItemsEnabled() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled(int position) {
		// TODO Auto-generated method stub
		return false;
	}

}
