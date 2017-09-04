/**
 * fuxin 20170902 create
 * 功能：产生唯一序列号
 * 算法：时间戳与UUID分别使用base36编码，再进行字符串拼接; 时间戳用于主键排序，UUID保证唯一性。
 */
package com.cims.mes.utils;

import java.math.BigInteger;
import java.util.Calendar;
import java.util.UUID;

public class UnitedSerialNumber {
  private String serialNumber;

  public String generateSerialNumber() {
    Calendar calendar = Calendar.getInstance();
    final String uuid = UUID.randomUUID().toString().replace("-", "");
    BigInteger bigUUID = new BigInteger(uuid, 16);  // UUID字符串按照基数16转换为BigInteger
    BigInteger bigTimeInMillis = new BigInteger(Long.toString(calendar.getTimeInMillis()));  // 时间戳转换为BigInteger
    this.serialNumber = bigTimeInMillis.toString(36) + bigUUID.toString(36); // base36编码并进行字符串拼接，得到结果
    return serialNumber;
  }
}
