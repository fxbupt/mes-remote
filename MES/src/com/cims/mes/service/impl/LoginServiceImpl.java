package com.cims.mes.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cims.mes.mapper.UserMapper;
import com.cims.mes.beans.UserBean;
import com.cims.mes.service.ILoginService;
@Service
public class LoginServiceImpl implements ILoginService{
	
	@Resource
	private UserMapper um;


	@Override
	public UserBean Login(String username, String password) {
		return um.login(username, password);
	}

}
