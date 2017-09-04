package test;

import com.cims.mes.utils.UnitedSerialNumber;

public class UnitedSerialNumberTest {
  public static void main(String[] args) {
    UnitedSerialNumber USN = new UnitedSerialNumber();
    System.out.println(USN.generateSerialNumber());
  }
}
