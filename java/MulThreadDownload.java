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
  
  
public class MulThreadDownload { 

  public static void main(String[] args) throws Exception { 

	    Map<String,String> map=new LinkedHashMap<String,String>();
		
		map.put("downURL000000","https://www.imooc.com/static/img/landp_banner.jpg");

		log("需要下载的文件有-->");
		for (Map.Entry<String, String> entry : map.entrySet()) {
			 log(entry.getKey().substring(7)+".grib");	
         }

		MulThreadDownload mulThreadDownload= new MulThreadDownload(); 
		for (Map.Entry<String, String> entry : map.entrySet()) {
            // System.out.println("key= " + entry.getKey() + " and value= " + entry.getValue());	
			 mulThreadDownload.download(entry.getValue(),entry.getKey().substring(7)+".grib", 2);			 
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
  
  
  
  
  /** 
   * 下载文件 
   * 
   * @param path 
   *      网络文件路径 
   * @param threadSize 
   *      线程数 
   * @throws Exception 
   */
  private void download(String urlStr,String path, int threadSize) throws Exception { 
    log("开始下载 "+urlStr+"->"+path); 
    log(threadSize+"个线程开始下载...");
	URL url = new URL(urlStr); 
    HttpURLConnection connection = (HttpURLConnection) url.openConnection(); 
    connection.setRequestMethod("GET"); 
    connection.setConnectTimeout(50000); 
    if (connection.getResponseCode() == 200) { 
      int length = connection.getContentLength();
      File file = new File(path); 
      //在本地生成一个长度与网络文件相同的文件 
      RandomAccessFile accessFile = new RandomAccessFile(file, "rwd"); 
      accessFile.setLength(length); 
      accessFile.close(); 
  
      // 计算每条线程负责下载的数据量 
      int block = length % threadSize == 0 ? length / threadSize : length/ threadSize + 1; 
      
	  Vector<Thread> vectors=new Vector<Thread>();
	  
	  for (int threadId = 0; threadId < threadSize; threadId++) { 
          Thread t= new DownloadThread(threadId, block, url, file); 
		  vectors.add(t);
		  t.start();		 
      }
	  for(Thread thread : vectors){
			thread.join(); 
	  }
   	  log(">>>>>>>>"+path+"下载完成");
		
    } else { 
       log("下载失败");
	   JOptionPane.showMessageDialog(null, "连接失败", "下载失败", JOptionPane.ERROR_MESSAGE);	   
    } 
  } 
  
  private class DownloadThread extends Thread { 
  
    private int threadId; 
    private int block; 
    private URL url; 
    private File file; 
  
    public DownloadThread(int threadId, int block, URL url, File file) { 
      this.threadId = threadId; 
      this.block = block; 
      this.url = url; 
      this.file = file; 
    } 
  
    @Override
    public void run() { 
      int start = threadId * block; // 计算该线程从网络文件什么位置开始下载 
      int end = (threadId + 1) * block - 1; // 计算下载到网络文件什么位置结束 
      try { 
        RandomAccessFile accessFile = new RandomAccessFile(file, "rwd"); 
        accessFile.seek(start); //从start开始 
  
        HttpURLConnection connection = (HttpURLConnection) url 
            .openConnection(); 
        connection.setRequestMethod("GET"); 
        connection.setConnectTimeout(5000); 
        //设置获取资源数据的范围，从start到end 
        connection.setRequestProperty("Range", "bytes=" + start + "-"
            + end); 
        //注意多线程下载状态码是 206 不是200 
        if (connection.getResponseCode() == 206) { 
          InputStream inputStream = connection.getInputStream(); 
          byte[] buffer = new byte[1024*1024]; 	 
          int maxProgres=end-start;
		  int len = 0; 
		  int progres = 0; 
		  int unit = maxProgres / 100;
		  int unitProgress = 0;  
          while ((len = inputStream.read(buffer)) != -1) { 
            accessFile.write(buffer, 0, len); 
			progres+=len;
			System.out.println("线程"+(threadId + 1)+"已下载"+(((float)progres)/(1024*1024))+"Mb");
			int temp = progres / unit;
			if (temp >= 1 && temp > unitProgress) {
				unitProgress = temp;
				log("线程"+(threadId + 1)+"正在下载>>>>>>>>>>>>>>>>>>>>>>>>" + unitProgress + "%");
            }					
          }
			if(unitProgress<100){
				 log("线程" + (threadId + 1) + "因超时下载失败-->"+file.getName());
				 JOptionPane.showMessageDialog(null, "线程" + (threadId + 1) + "因超时下载失败-->"+file.getName(), "下载失败", JOptionPane.ERROR_MESSAGE);					 
			}else if(unitProgress==100){										
					 log("线程" + (threadId + 1) + "条线程已经下载完成-->"+file.getName()); 
					 
			}		
          accessFile.close(); 
          inputStream.close(); 
        }
		



       
      } catch (Exception e) {
			log("第" + (threadId + 1) + "条线程下载失败");
			log(e);			
            e.printStackTrace(); 
      } 
    } 
  } 
  
}