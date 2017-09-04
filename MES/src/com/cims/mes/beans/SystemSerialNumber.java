package com.cims.mes.beans;

public class SystemSerialNumber {
  private String ID;
  private String tableName;
  private String prefix;
  private String suffix;
  private String maxNum;
  private int snLength;
  private String description;
  
  public String getID() {
    return ID;
  }
  public void setID(String iD) {
    ID = iD;
  }
  public String getTableName() {
    return tableName;
  }
  public void setTableName(String tableName) {
    this.tableName = tableName;
  }
  public String getPrefix() {
    return prefix;
  }
  public void setPrefix(String prefix) {
    this.prefix = prefix;
  }
  public String getSuffix() {
    return suffix;
  }
  public void setSuffix(String suffix) {
    this.suffix = suffix;
  }
  public String getMaxNum() {
    return maxNum;
  }
  public void setMaxNum(String maxNum) {
    this.maxNum = maxNum;
  }
  public int getSnLength() {
    return snLength;
  }
  public void setSnLength(int snLength) {
    this.snLength = snLength;
  }
  public String getDescription() {
    return description;
  }
  public void setDescription(String description) {
    this.description = description;
  }
}
