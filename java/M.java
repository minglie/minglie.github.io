
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.lang.annotation.Annotation;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.AccessibleObject;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;

/**
 *
 * 2018-4-24
 *
 * @author Administrator
 */
public class M {

	public static Map global_Map=new HashMap(10);
	private static final String LINE_SEPARATOR = System.getProperty("line.separator");
	private static int CON_ENABLE;
	private static int CON_CONSOLE_ENABLE;
	private static int CON_W_ENABLE;
	private static int CON_IN_ENABLE;
	private static int CON_OUT_ENABLE;
	private static String JDBC_driverClassName;
	private static String JDBC_url;
	private static String JDBC_username;
	private static String JDBC_password;

	///////////////////////////////////////////////////////
	private static Method log4jlogInfo = null;
	private static Object log4jlog = null;
	private static Properties prop;
	static {

		InputStream is = M.class.getResourceAsStream("/M.properties");
		try {
			prop = new Properties();
			if (is != null)
				prop.load(is);
			else
				prop = null;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (is != null)
					is.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	static {
		String str = "";
		try {
			if (prop != null) {
				str = propertiesRead("CON_ENABLE");
				CON_ENABLE = str != null && str.equals("0") ? 0 : 1;
				str = propertiesRead("CON_W_ENABLE");
				CON_W_ENABLE = str != null && str.equals("0") ? 0 : 1;
				str = propertiesRead("CON_IN_ENABLE");
				CON_IN_ENABLE = str != null && str.equals("0") ? 0 : 1;
				str = propertiesRead("CON_OUT_ENABLE");
				CON_OUT_ENABLE = str != null && str.equals("0") ? 0 : 1;

				str = propertiesRead("CON_CONSOLE_ENABLE");
				CON_CONSOLE_ENABLE = str != null && str.equals("0") ? 0 : 1;

				JDBC_driverClassName = propertiesRead("jdbc.driverClassName");
				JDBC_url = propertiesRead("jdbc.url");
				JDBC_username = propertiesRead("jdbc.username");
				JDBC_password = propertiesRead("jdbc.password");
			} else {
				JDBC_driverClassName = "oracle.jdbc.OracleDriver";
				JDBC_url = "jdbc:oracle:thin:@localhost:1521:XE";
				JDBC_username = "hr";
				JDBC_password = "hr";

				CON_ENABLE = 1;
				CON_W_ENABLE = 1;
				CON_IN_ENABLE = 1;
				CON_OUT_ENABLE = 1;
				CON_CONSOLE_ENABLE = 1;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String propertiesRead(String key) {
		if (prop == null)
			return null;
		String value = prop.getProperty(key);
		return value;
	}

	@Target(value = { ElementType.TYPE, ElementType.METHOD, ElementType.FIELD })
	@Retention(RetentionPolicy.RUNTIME)
	public @interface MingConfig {
		String value() default "in out w";
	}

	public static String in(Object... param) {
		StringBuilder sb = new StringBuilder();
		Throwable t = new Throwable();
		Class clazz = null;
		try {
			clazz = Class.forName(t.getStackTrace()[1].getClassName());
		} catch (ClassNotFoundException e) {

			e.printStackTrace();
		}
		List<String> list = AnnotationHelper.getMingConfigInfo(clazz);
		if ((list == null || list.contains("in")) && M.CON_IN_ENABLE == 1
				&& CON_ENABLE == 1) {
			sb.append("------------in  ");
			sb.append(t.getStackTrace()[1].getClassName() + ".");
			sb.append(t.getStackTrace()[1].getMethodName() + "------");
			sb.append(LINE_SEPARATOR);

			if (param != null && param.length > 0) {
				for (int i = 0; i < param.length; i++) {
					sb.append("[in:" + i + "]==>  " + param[i]);
					sb.append(LINE_SEPARATOR);
				}
			} else {
				sb.append("[in:" + 0 + "]==>  " + "null");
			}
		}
		if (CON_CONSOLE_ENABLE == 1)
			System.out.println(sb);
		return sb.toString();
	}

	public static String out(Object... param) {
		StringBuilder sb = new StringBuilder();
		Throwable t = new Throwable();
		Class clazz = null;
		try {
			clazz = Class.forName(t.getStackTrace()[1].getClassName());
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		List<String> list = AnnotationHelper.getMingConfigInfo(clazz);
		if ((list == null || list.contains("out")) && M.CON_OUT_ENABLE == 1
				&& CON_ENABLE == 1) {
			if (param != null && param.length > 0) {
				for (int i = 0; i < param.length; i++) {
					sb.append("[out:" + i + "]==>  " + param[i]);
					sb.append(LINE_SEPARATOR);
				}
			} else {
				sb.append("[out:" + 0 + "]==>  " + "null");
				sb.append(LINE_SEPARATOR);
			}
			sb.append("------------out ");
			sb.append(t.getStackTrace()[1].getClassName() + ".");
			sb.append(t.getStackTrace()[1].getMethodName() + "------");
			sb.append(LINE_SEPARATOR);
			sb.append(LINE_SEPARATOR);
		}
		if (CON_CONSOLE_ENABLE == 1)
			System.out.println(sb);
		return sb.toString();
	}

	@SuppressWarnings("unused")
	public static String w(Object... param) {
		StringBuilder sb = new StringBuilder();
		Throwable t = new Throwable();
		Class clazz = null;
		try {
			clazz = Class.forName(t.getStackTrace()[1].getClassName());
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		List<String> list = AnnotationHelper.getMingConfigInfo(clazz);
		if ((list == null || list.contains("w")) && M.CON_W_ENABLE == 1
				&& CON_ENABLE == 1) {
			if (param != null && param.length > 0) {
				for (int i = 0; i < param.length; i++) {
					sb.append("[w:" + i + "]==>  " + param[i]);
					sb.append(LINE_SEPARATOR);
				}
			} else {
				sb.append("[w:" + 0 + "]==>  " + "null");
				sb.append(LINE_SEPARATOR);
			}
		}
		if (CON_CONSOLE_ENABLE == 1)
			System.out.println(sb);
		return sb.toString();
	}

	@SuppressWarnings("unused")
	public static String rw(Object... param) {
		StringBuilder sb = new StringBuilder();
		Throwable t = new Throwable();
		Class clazz = null;
		try {
			clazz = Class.forName(t.getStackTrace()[1].getClassName());
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		List<String> list = AnnotationHelper.getMingConfigInfo(clazz);
		if ((list == null || list.contains("w")) && M.CON_W_ENABLE == 1
				&& CON_ENABLE == 1) {
			if (param != null && param.length > 0) {
				for (int i = 0; i < param.length; i++) {
					sb.append("[rw:" + i + "]==>  "
							+ GeneralToString.toString(param[i]));
					sb.append(LINE_SEPARATOR);
				}
			} else {
				sb.append("[rw:" + 0 + "]==>  " + "null");
				sb.append(LINE_SEPARATOR);
			}
		}
		if (CON_CONSOLE_ENABLE == 1)
			System.out.println(sb);
		return sb.toString();
	}

	public static void log(Object... param) {
		Class<?> clazz = null;
		StringBuilder sb = new StringBuilder();
		if (param != null && param.length > 0) {
			for (int i = 0; i < param.length; i++) {
				sb.append(param[i].toString() + " ");
			}
		} else {
			sb.append("null");
		}

		try {
			if (log4jlogInfo == null) {
				clazz = Class.forName("org.apache.log4j.Logger");
				Method method = clazz.getMethod("getLogger", String.class);
				log4jlog = method.invoke(null, "M");
				log4jlogInfo = clazz.getSuperclass().getDeclaredMethod("info",
						Object.class);
			}
			log4jlogInfo.invoke(log4jlog, sb.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	public static String getRandomNumber(int digCount) {
		Random rnd = new Random();
		StringBuilder sb = new StringBuilder(digCount);
		for (int i = 0; i < digCount; i++)
			sb.append((char) ('0' + rnd.nextInt(10)));
		return sb.toString();
	}

	public static String p(String str, Object... param) {
		String result = "";
		if (param != null && param.length > 0) {
			StringBuilder sb = new StringBuilder();
			int i = 0, j = 0;
			while ((i = str.indexOf("?")) != -1) {
				sb.append(str.substring(0, i) + param[j++].toString());
				str = str.substring(i + 1);
			}
			sb.append(str);
			result = sb.toString();
		} else {
			result = str;
		}
		return result;
	}

	public static Object doSql(String sql) {
		Connection conn = null;
		PreparedStatement ps = null;
		Object result = null;
		List list = new ArrayList();
		try {
			Class.forName(M.JDBC_driverClassName);
			conn = DriverManager.getConnection(M.JDBC_url, M.JDBC_username,
					M.JDBC_password);
			ps = conn.prepareStatement(sql);
			if (sql.toUpperCase().contains("SELECT")) {
				result = ps.executeQuery();
			} else {
				result = ps.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
		return result;
	}

	public static Document document(File file) {
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		DocumentBuilder db;
		Document document = null;
		try {
			db = dbf.newDocumentBuilder();
			document = db.parse(file);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return document;
	}

	public static void delayms(long delay_parameter) {
		try {
			Thread.sleep(delay_parameter);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}


	public static void telnet(String address){
		Socket s = null;
		try {
			s = new Socket(address.split(":")[0],Integer.parseInt(address.split(":")[1]));
			BufferedReader bufr=new BufferedReader(new InputStreamReader(System.in));
			PrintWriter out = new PrintWriter(s.getOutputStream(),true);
			BufferedReader bufIn  = new BufferedReader(new InputStreamReader(s.getInputStream()));
			String line = null;
			System.out.println(">>");
			while((line=bufr.readLine())!=null){
				if("exit".equals(line))break;
				out.println(line);
				String upperStr = bufIn.readLine();
				System.out.println(upperStr);
				System.out.println(">>");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally{

			try {
				s.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public static void telnetServer(final InvocationHandler handler, int port){
		ServerSocket ss =null;
		Socket s=null;
		try{
			System.out.println("Listener on:" + port);
			ss = new ServerSocket(port);
			s = ss.accept();
			String ip = s.getInetAddress().getHostAddress();
			System.out.println(ip+"......connected");
			BufferedReader bufIn = new BufferedReader(new InputStreamReader(s.getInputStream()));
			PrintWriter out = new PrintWriter(s.getOutputStream(),true);
			String line = null;
			while((line=bufIn.readLine())!=null){
				try {
					String returnStr = (String) handler.invoke(line, null, null);
					out.println(returnStr);
				} catch (Throwable e) {
					e.printStackTrace();
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			try {
				s.close();
				ss.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}


	public static String bioClientSend(String address, String msg) {
		Socket socket = new Socket();
		StringBuilder sb = null;
		try {
			socket.connect(new InetSocketAddress(address.split(":")[0], Integer
					.parseInt(address.split(":")[1])));
			OutputStream os = socket.getOutputStream();
			PrintWriter pw = new PrintWriter(os);
			InputStream is = socket.getInputStream();
			InputStreamReader isr = new InputStreamReader(is);
			BufferedReader br = new BufferedReader(isr);
			pw.println(msg);
			pw.flush();
			socket.shutdownOutput();
			sb = new StringBuilder();
			String line = null;
			while ((line = br.readLine()) != null ) {
				sb.append(line);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				socket.close();
			} catch (IOException e) {

				e.printStackTrace();
			}
		}
		return sb.toString();
	}


	public static void bioServer(final InvocationHandler handler, int port) {
		ServerSocket ss = null;
		try {
			ss = new ServerSocket();
			ss.bind(new InetSocketAddress(port));
			ExecutorService pool = Executors.newFixedThreadPool(1);
			System.out.println("Listener on:" + port);
			while (true) {
				final Socket s = ss.accept();
				System.out.println("receive data...");
				InetAddress inetAddress = s.getInetAddress();
				final String remoteIp = inetAddress.getHostAddress();
				pool.submit(new Runnable() {
					@Override
					public void run() {
						try {
							InputStream request = s.getInputStream();
							byte[] buf = new byte[1024];
							int len = request.read(buf);
							String text = new String(buf,0,len+1);
							Object[] objs=new Object[1];

							//建议响应数据
							String out="HTTP/1.1 200 OK\n";
							out+="Server: Apache-Coyote/1.1\n";
							out+="Content-Type: text/html\n";
							out+="Content-Length: 41\n";
							out+="Date: Fri, 11 May 2012 07:51:39 GMT\n";
							out+="Connection: close\n";
							out+="\n";
							out+="<font color='red' size='7'>welcome</font>";
							objs[0]=out;

							String returnStr = (String) handler.invoke(text, null, objs);
							OutputStream response = s.getOutputStream();
							PrintWriter pw = new PrintWriter(response);
							pw.println(returnStr);
							pw.flush();
							s.shutdownOutput();

						} catch (IOException e) {
							e.printStackTrace();
						} catch (Throwable e) {
							e.printStackTrace();
						} finally {
							try {
								s.close();
							} catch (IOException e) {
								e.printStackTrace();
							}
						}
					}
				});
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				ss.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}


	public static String udpSend(String msg, int localPort, String remoteAddress) {
		DatagramSocket ds = null;
		try {
			ds = new DatagramSocket(localPort);
			byte[] buf = msg.getBytes();
			String remoteIp = remoteAddress.split(":")[0];
			int remotePort = Integer.parseInt(remoteAddress.split(":")[1]);
			DatagramPacket dp;
			dp = new DatagramPacket(buf, buf.length,InetAddress.getByName(remoteIp), remotePort);
			ds.send(dp);
			byte[] buf1 = new byte[1024];
			DatagramPacket dp1 = new DatagramPacket(buf1, buf1.length);
			ds.receive(dp1);
			String ip = dp1.getAddress().getHostAddress();
			int port = dp1.getPort();
			String text = new String(dp1.getData(), 0, dp1.getLength());
			return text;

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			ds.close();
		}
		return null;
	}

	public static void udpReceve(final InvocationHandler handler, int localPort) {
		DatagramSocket ds = null;
		try {
			ds = new DatagramSocket(10000);
			System.out.println("Listener on:" + localPort);
			while (true) {
				byte[] buf = new byte[1024];
				DatagramPacket dp = new DatagramPacket(buf, buf.length);
				ds.receive(dp);
				System.out.println("receive data...");
				String remoteIp = dp.getAddress().getHostAddress();
				int remotePort = dp.getPort();
				String text = new String(dp.getData(), 0, dp.getLength());
				Object objs[] = new Object[1];
				HashMap map = new HashMap();
				map.put("remoteIp", remoteIp);
				map.put("remotePort", remotePort + "");
				objs[0] = map;
				String returnStr = (String) handler.invoke(text, null, objs);
				buf=returnStr.getBytes();
				dp = new DatagramPacket(buf, buf.length,InetAddress.getByName(remoteIp), remotePort);
				ds.send(dp);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} catch (Throwable e) {
			e.printStackTrace();
		} finally {
			ds.close();
		}
	}
}



class AnnotationHelper {
	@SuppressWarnings("unchecked")
	public static List<String> getMingConfigInfo(Object obj) {
		Annotation annotation = null;
		List<String> result = null;

		if (obj instanceof Class) {
			annotation = ((Class) obj).getAnnotation(M.MingConfig.class);
		} else if (obj instanceof Method) {
			annotation = ((Method) obj).getAnnotation(M.MingConfig.class);
		}

		if (annotation != null) {
			M.MingConfig mi = (M.MingConfig) annotation;
			result = Arrays.asList(mi.value().split(" "));
		}
		return result;
	}
}

class GeneralToString {
	public static String toString(Object obj) {
		if (obj == null)
			return "null";
		String result = "null";
		StringBuffer strBuf = new StringBuffer();
		Class<? extends Object> cla = obj.getClass();

		if (cla == Integer.class || cla == Short.class || cla == Byte.class
				|| cla == Long.class || cla == Double.class
				|| cla == Float.class || cla == Boolean.class
				|| cla == String.class || cla == Character.class) {
			strBuf.append(obj);
			result = strBuf.toString();
		}

		if (result.equals("null") && cla.isArray()) {
			strBuf.append("[");
			for (int i = 0; i < Array.getLength(obj); i++) {
				if (i > 0)
					strBuf.append(",");
				Object val = Array.get(obj, i);

				if (val != null && !val.equals("")) {
					strBuf.append(val.toString());
				}
			}
			strBuf.append("]");
			result = strBuf.toString();
		}
		if (result.equals("null")) {

			Field[] fields = cla.getDeclaredFields();

			AccessibleObject.setAccessible(fields, true);
			String className = cla.toString();
			className = className.substring(className.lastIndexOf(".") + 1);
			strBuf.append(className + " [");
			for (int i = 0; i < fields.length; i++) {
				Field fd = fields[i];
				strBuf.append(fd.getName() + "=");
				try {
					if (!fd.getType().isPrimitive()
							&& fd.getType() != String.class) {
						if (fd.get(obj) != null) {
							strBuf.append(fd.get(obj).toString());
						} else {
							strBuf.append("null");
						}
					} else {
						strBuf.append(fd.get(obj));
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				if (i != fields.length - 1)
					strBuf.append(", ");
			}
			strBuf.append("]");
		}
		return strBuf.toString();
	}
}

}
