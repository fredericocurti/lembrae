package br.edu.insper;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

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