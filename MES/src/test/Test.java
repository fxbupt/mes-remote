package test;

import java.math.BigInteger;
import java.util.Calendar;
//import java.util.Date;
//import java.text.DecimalFormat;
import java.util.UUID;

//import com.google.common.io.BaseEncoding;

public class Test {
  public static void main(String[] args) {
    Calendar calendar = Calendar.getInstance();
    System.out.println(calendar.getTimeInMillis());
    final String uuid = Long.toString(calendar.getTimeInMillis())+UUID.randomUUID().toString().replace("-", "");
    BigInteger big = new BigInteger(uuid, 16);
    System.out.println(big.toString(36));
    //System.out.println(BaseEncoding.base32().encode(uuid.getBytes()));
    try {
      Thread.sleep(2000);
    } catch (InterruptedException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    final String uuid2 = Long.toString(calendar.getTimeInMillis())+UUID.randomUUID().toString().replace("-", "");
    BigInteger big2 = new BigInteger(uuid2, 16);
    System.out.println(big2.toString(36));
    //System.out.println(BaseEncoding.base32().encode(uuid2.getBytes()));
    
    if (big.compareTo(big2)<0){
      System.out.println(big.toString(36));
      System.out.println(big2.toString(36));
    }
//    DecimalFormat df1 = new DecimalFormat("000.##");
//    System.out.println(df1.format(12.34));
    // System.out.println((100+"").length());

  }
  // 减少了有效位数，增加了碰撞概率
  public static String[] chars = new String[] 
      {
          "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
          "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
          "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V","W", "X", "Y", "Z" 
      };  


  public static String getShortUuid() 
  {  
      StringBuffer stringBuffer = new StringBuffer();  
      String uuid = UUID.randomUUID().toString().replace("-", "");  
      for (int i = 0; i < 8; i++) 
      {  
          String str      = uuid.substring(i * 4, i * 4 + 4);  
          int strInteger  = Integer.parseInt(str, 16);  
          stringBuffer.append(chars[strInteger % 0x3E]);  
      }  
       
      return stringBuffer.toString();  
  }
}
