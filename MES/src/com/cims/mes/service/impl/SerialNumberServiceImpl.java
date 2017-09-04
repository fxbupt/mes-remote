/**
 * fuxin 20170904 create
 * 功能：按照指定的前缀、后缀，与自增数字拼接，生成序列号
 * 算法：
 */
package com.cims.mes.service.impl;

import java.text.DecimalFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cims.mes.beans.SystemSerialNumber;
import com.cims.mes.mapper.SystemSerialNumberMapper;

@Service
public class SerialNumberServiceImpl {
  @Autowired
  private SystemSerialNumberMapper systemSerialNumberMapper;
  
  public String generateSerialNumber(String tableName) {
    SystemSerialNumber systemSerialNumber = systemSerialNumberMapper.selectSerialNumberTarget(tableName);
    String serialNumberFormat = new String("");
    int zeroNum = systemSerialNumber.getSnLength() - systemSerialNumber.getPrefix().length();
    for (int i = 0; i < zeroNum; i++) {
      serialNumberFormat += "0";
    }
    DecimalFormat format = new DecimalFormat(serialNumberFormat);   
    Integer seed = Integer.parseInt(systemSerialNumber.getMaxNum())+1;
    systemSerialNumberMapper.updateMaxNum(seed.toString(), systemSerialNumber.getTableName());
    String result = systemSerialNumber.getPrefix() + format.format(seed) + systemSerialNumber.getSuffix();
    return result;
  }
}
