package test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.cims.mes.service.impl.SerialNumberServiceImpl;

public class SerialNumberServiceTest {
  public static void main(String[] args){
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    
    SerialNumberServiceImpl serialNumberService = (SerialNumberServiceImpl) context.getBean("serialNumberServiceImpl");
    System.out.println(serialNumberService.generateSerialNumber("order"));
  }
}
