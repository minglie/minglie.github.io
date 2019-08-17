

import java.io.*;
import java.util.Date;

public class M {

  public static String  log_path="C:M.log";
  public static boolean log_enable=true;
  public static boolean log_file_enable=true;
  public static boolean log_console_enable=false;
  public static boolean log_display_time=true;
  public static boolean log_reset=false;


  public static   PrintWriter printWriter ;

  static {
        try {
            printWriter = new PrintWriter(new FileWriter (new File(log_path),!log_reset));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public static void log(String s){
      if(log_enable){
          if(log_display_time){
             s=(new Date().toLocaleString()+" ")+s;
          }
          if(log_file_enable){
              printWriter.println(s);
              printWriter.flush();
          }
          if(log_console_enable){
              System.out.println(s);
          }
      }
    }
}
