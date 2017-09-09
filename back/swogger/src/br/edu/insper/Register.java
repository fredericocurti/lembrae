package br.edu.insper;

<<<<<<< HEAD
import org.json.JSONObject;
=======
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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
import org.json.*;
>>>>>>> 25515533c59f5eac67869b15f8eeb5634a475e30

/**
 * Servlet implementation class Login
 */
@WebServlet("/register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Register() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("POST Request received @ servlet /register");
		
		// Request
		String received = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		JSONObject obj = new JSONObject(received);
		JSONObject payload = obj.getJSONObject("payload");
		System.out.println(obj.get("action") + ":" + payload);
		
		DAO dao = new DAO();
		// response
		JSONObject res = new JSONObject();
		dao.register( payload, (Map<String,Object> result) -> {
					if (result.isEmpty()){
						res.put("status","FAILURE");
						System.out.println("[REGISTER] : User already exists.");
					} else {
						res.put("status", "SUCCESS");
						res.put("payload",new JSONObject(result.get("user")));
						System.out.println("[REGISTER] : " + result);
					}
					try {
						response.getWriter().println(res);
					} catch(IOException e) {
						e.printStackTrace();
					}
				});
	}

}
