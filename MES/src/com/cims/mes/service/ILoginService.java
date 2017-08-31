package com.cims.mes.service;


import com.cims.mes.beans.UserBean;

public interface ILoginService {

	public UserBean Login(String username,String password);
	
	
}
