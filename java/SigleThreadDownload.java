import java.io.File; 
import java.io.InputStream; 
import java.io.RandomAccessFile; 
import java.net.HttpURLConnection; 
import java.net.URL;
import java.util.Vector; 
import java.io.PrintWriter; 
import java.io.FileOutputStream;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.LinkedHashMap;  
import javax.swing.*;  

public  class SigleThreadDownload {
	
	 public static void main(String[] args) throws Exception {
        	
	
		Map<String,String> map=new LinkedHashMap<String,String>();

		map.put("downURL000000","https://www.imooc.com/static/img/landp_banner.jpg");


         log("需要下载的文件有-->");
		for (Map.Entry<String, String> entry : map.entrySet()) {
			 log(entry.getKey().substring(7)+".grib");	
         }
		
		
		
		for (Map.Entry<String, String> entry : map.entrySet()) {
            // System.out.println("key= " + entry.getKey() + " and value= " + entry.getValue());	
			 SigleThreadDownload.download(entry.getValue(),entry.getKey().substring(7)+".grib");
            log("=======^V^============^V^=============^V^============"+entry.getValue()+"下载完成...");
            JOptionPane.showMessageDialog(null, entry.getKey()+"下载完成...", "下载成功", JOptionPane.ERROR_MESSAGE);
        }


         log("-------------------------全部下载完毕!----------------------------------------------------");
         JOptionPane.showMessageDialog(null,  "-----全部下载完毕!----","下载成功", JOptionPane.ERROR_MESSAGE);

     }
	
	
	
	
	
	
   public static PrintWriter printWriter;
  
    static {       
            try {
                printWriter = new PrintWriter(new FileOutputStream("M.log"));
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
        
    }
  
 
   public static void log(Object... param) {    
            StringBuilder sb = new StringBuilder();
            if (param != null && param.length > 0) {
                for (int i = 0; i < param.length; i++) {
                    sb.append(param[i].toString() + " ");
                }
            } else {
                sb.append("null");
            }

            printWriter.println(sb.toString());
			System.out.println(sb.toString());
            printWriter.flush();     
    }
  
  
	
	
	
	
	
	
	
	
	
    public static void download(String url, String path) throws Exception {
        log("开始下载 "+url+"->"+path);
        InputStream inputStream = null;
        RandomAccessFile randomAccessFile = null;
        try {
            HttpURLConnection urlConnection = (HttpURLConnection) new URL(url).openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setConnectTimeout(50 * 1000);
            File file = new File(path);         
            if (file.exists()) { file.delete(); }
            file.createNewFile();
            int responseCode = urlConnection.getResponseCode();
            if (responseCode >= 200 && responseCode < 300) {
                inputStream = urlConnection.getInputStream();
                int len = 0;
                byte[] data = new byte[1024*1024];
                int progres = 0; 
                int maxProgres = urlConnection.getContentLength();
                randomAccessFile = new RandomAccessFile(file, "rwd");
                randomAccessFile.setLength(maxProgres);
                int unit = maxProgres / 100;
                int unitProgress = 0; 
                while (-1 != (len = inputStream.read(data))) {
                    randomAccessFile.write(data, 0, len);
                    progres += len;
                    System.out.println("已下载"+(((float)progres)/(1024*1024))+"Mb");
                    int temp = progres / unit;
                    if (temp >= 1 && temp > unitProgress) {
                        unitProgress = temp;
                        log("正在下载>>>>>>>>>>>>>>>>>>>>>>>>" + unitProgress + "%");
                    }
                }
                inputStream.close();
                if(unitProgress<100){
					log(">>>>>>>>"+path+"因超时下载失败");
                    JOptionPane.showMessageDialog(null, "因超时下载失败-->"+path, "下载失败", JOptionPane.ERROR_MESSAGE);
				}else if(unitProgress==100){
                    log("条线程已经下载完成-->"+path);
                }
				
				
            } else {
                log("连接失败");
				 JOptionPane.showMessageDialog(null, ">>>>>>>>"+path+"连接失败", "连接失败", JOptionPane.ERROR_MESSAGE);
            }
        }catch (Exception e) {
			log(path+"内部异常");
			JOptionPane.showMessageDialog(null, path+"内部异常", "内部异常", JOptionPane.ERROR_MESSAGE);
			log(e);			
            e.printStackTrace(); 
      }  finally {
            if (null != inputStream) {
                inputStream.close();
            }
            if (null != randomAccessFile) {
                randomAccessFile.close();
            }
        }
    }
}















