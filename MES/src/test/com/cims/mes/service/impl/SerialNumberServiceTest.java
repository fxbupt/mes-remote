package test.com.cims.mes.service.impl;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import static org.junit.Assert.assertEquals;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.support.ClassPathXmlApplicationContext;
//
import com.cims.mes.service.ISerialNumberService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
public class SerialNumberServiceTest {
  @Autowired
  ISerialNumberService serialNumberServiceImpl;
  
  @Test
  public void generateSerialNumberTest(){
    String actual = serialNumberServiceImpl.generateSerialNumber("order");
    String expected = "ordr00000000000000000000000007";
    assertEquals("failure - serial number is not expected", expected, actual);
  }
  
  /*  public static void main(String[] args){
    ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
    
    ISerialNumberService serialNumberService = (ISerialNumberService) context.getBean("serialNumberServiceImpl");
    System.out.println(serialNumberService.generateSerialNumber("order"));
    ((ClassPathXmlApplicationContext) context).close();
  }*/
}
