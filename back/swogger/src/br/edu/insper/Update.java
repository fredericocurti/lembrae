package br.edu.insper;

<<<<<<< HEAD
import org.json.JSONObject;
=======
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;
import java.util.stream.Collectors;
>>>>>>> 25515533c59f5eac67869b15f8eeb5634a475e30

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
<<<<<<< HEAD
import java.io.IOException;
import java.util.Map;
import java.util.stream.Collectors;
=======

import org.json.JSONObject;
>>>>>>> 25515533c59f5eac67869b15f8eeb5634a475e30

@WebServlet("/update") 
public class Update extends HttpServlet {   

	@Override 
	protected void doGet(HttpServletRequest request,
	HttpServletResponse response)   throws ServletException, IOException { 
	}
 
	@Override 
	protected void doPost(HttpServletRequest request,
	HttpServletResponse response)	throws ServletException, IOException { 
		System.out.println("POST Request received - Update note");
		// Request
		String received = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		JSONObject obj = new JSONObject(received);
		JSONObject payload = obj.getJSONObject("payload");
		System.out.println(payload);
		DAO dao = new DAO();
		// response
		dao.update(payload,(Map<String,Object> result) -> {
			try {
				JSONObject res = new JSONObject().put("status",result.get("status"));
				response.getWriter().println(res);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		});
	}
	
	
	
}