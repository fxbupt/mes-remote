package com.cims.mes.mapper;

import org.apache.ibatis.annotations.Param;

import com.cims.mes.beans.SystemSerialNumber;

public interface SystemSerialNumberMapper {
  public SystemSerialNumber selectSerialNumberTarget(String tableName);
  public void updateMaxNum(@Param("maxNum") String maxNum, @Param("tableName") String tableName);
}
