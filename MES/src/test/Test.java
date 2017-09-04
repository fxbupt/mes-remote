package test;

import com.cims.mes.utils.UnitedSerialNumber;

public class Test {
  public static void main(String[] args) {
    UnitedSerialNumber USN = new UnitedSerialNumber();
    System.out.println(USN.generateSerialNumber());
  }
}
