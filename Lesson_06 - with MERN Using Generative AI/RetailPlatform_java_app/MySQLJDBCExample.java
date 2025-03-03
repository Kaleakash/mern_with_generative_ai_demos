import java.sql.*;
import java.util.Scanner;

public class MySQLJDBCExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/RetailPlatform";  // Change this to your database URL
        String user = "root";                                       // Change this to your database username
        String password = "root@123";                               // Change this to your database password        

        try {
            // Load MySQL JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establish connection
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("Connected to MySQL successfully!");

            // Execute a query
            PreparedStatement preparedStatement = conn.prepareStatement("SELECT * FROM users WHERE emailId = ? AND password = ?");
            Scanner sc = new Scanner(System.in);
            System.out.println("Enter emailId: ");
            String emailId = sc.nextLine();
            System.out.println("Enter password: ");
            String pass = sc.nextLine();

            // Set parameters for the query
            preparedStatement.setString(1, emailId);
            preparedStatement.setString(2, pass);


            // Process the results
            ResultSet resultSet = preparedStatement.executeQuery();
            if(resultSet.next()) {
                System.out.println("Login successful!");
            }else {
                System.out.println("Invalid emailId or password.");
            }

            // Close resources
            preparedStatement.close();
            conn.close();
            sc.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
