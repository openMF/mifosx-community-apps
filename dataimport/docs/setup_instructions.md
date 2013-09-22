Setup Instructions
==================

1. Before you run the application, you need to create a file dataimport.properties directly under your home directory. It should have the following 4 parameters:-

  mifos.endpoint=https://demo.openmf.org/mifosng-provider/api/v1/  
  mifos.user.id=mifos  
  mifos.password=password  
  mifos.tenant.id=default  

2. Use the command "gradle clean tomcatRunWar" to run the application and access it at localhost:8070/dataimport.

3. If you are hosting the data import tool in the cloud, you need to ssh into the system to create the dataimport.properties file.