package org.openmf.mifos.dataimport.web;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import javax.annotation.PostConstruct;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebServlet( name="StartupServlet", urlPatterns = {"/dummy"}, loadOnStartup=1)
public class StartupServlet extends HttpServlet {
	
	private static final long serialVersionUID = 3L;

	private static final Logger logger = LoggerFactory.getLogger(StartupServlet.class);
	
	
	 @PostConstruct  
	 public void initialize()  
	 {  
		 Properties prop = new Properties();
	     String homeDirectory = System.getProperty("user.home");
		 FileInputStream fis = null;
	     try {
	    	   fis = new FileInputStream(homeDirectory + "\\dataimport.properties");
  		       prop.load(fis);
               System.setProperty("mifos.endpoint", prop.getProperty("mifos.endpoint"));
               System.setProperty("mifos.user.id", prop.getProperty("mifos.user.id"));
               System.setProperty("mifos.password", prop.getProperty("mifos.password"));
               System.setProperty("mifos.tenant.id", prop.getProperty("mifos.tenant.id"));
               fis.close();
  	} catch (IOException ex) {
  		logger.error(ex.getMessage());
    } finally {
        if(fis!=null)
			try {
				fis.close();
			} catch (IOException ex) {
				logger.error(ex.getMessage());
			}
    }
	     
  } 
}
