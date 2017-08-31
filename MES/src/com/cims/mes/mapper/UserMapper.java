package com.cims.mes.mapper;

import java.util.List;
import java.util.Map;


import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.cims.mes.beans.UserBean;


public interface UserMapper {
	
	
	/**
	 * ��¼
	 * @param userName
	 * @param password
	 * @return
	 * @throws Exception
	 */
  /*
	@Select("select * from t_user where username=#{un} and password=#{pw}")
    @Results({
		
		@Result(id=true,property="id",column="id",javaType=Integer.class),
		@Result(property="username",column="username",javaType=String.class),
		@Result(property="password",column="password",javaType=String.class),
		@Result(property="account",column="account",javaType=Double.class)
	})
	   */
	public UserBean login(@Param("un")String username,@Param("pw")String password);

	/**
	 * �����Ñ�
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@Insert("insert into t_user value (null,user.username,user.password,user.account)")
	@Options(useGeneratedKeys=true,keyProperty="user.id")
	public int insertUser(@Param("user")UserBean user) throws Exception;
	
	
	/**
	 * �޸��Ñ�
	 * @param user
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@Update(" update t_user set username=#{u.username},password=#{u.password},account=#{u.account} where id=#{id}")
    public int updateUser (@Param("u")UserBean user,@Param("id")int id) throws Exception;
	
     /**
      * �h���Ñ�
      * @param id
      * @return
      * @throws Exception
      */
	@Delete(" delete from t_user where id=#{id}  ")
    public int deleteUser(int id) throws Exception;
	
	
    /**
     * ����id��ѯ�û���Ϣ
     * @param id
     * @return
     * @throws Exception
     */
	
	@Select(" select * from t_user where id=#{id}")
	@Results({ 
		@Result(id=true,property="id",column="id",javaType=Integer.class),
		@Result(property="username",column="username",javaType=String.class),
		@Result(property="password",column="password",javaType=String.class),
		@Result(property="account",column="account",javaType=Double.class)
	})
    public UserBean selectUserById(int id) throws Exception;
     /**
      * ��ѯ���е��û���Ϣ
      * @return
      * @throws Exception
      */
	
	@Select(" select * from t_user")
	@ResultMap("userMap")
    public List<UserBean> selectAllUser() throws Exception;
    
    
    /**
     * ��������
     * @param user
     * @return
     * @throws Exception
     */
   public int batchInsertUser(@Param("users")List<UserBean> user) throws Exception;
   
   /**
    * ����ɾ��
    * @param list
    * @return
    * @throws Exception
    */
   public int batchDeleteUser(@Param("list")List<Integer> list) throws Exception;
   
   
   /**
    * ��ҳ��ѯ����
    * @param parma
    * @return
    * @throws Exception
    */
   public List<UserBean> pagerUser(Map<String, Object> parmas) throws Exception;
   
   /**
    * 
    * ��ҳͳ������
    * @param parma
    * @return
    * @throws Exception
    */
    public int countUser(Map<String, Object> parmas) throws Exception;
    
  
    
    
}
