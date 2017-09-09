package br.edu.insper;

<<<<<<< HEAD
=======
import java.io.IOException;
import java.io.PrintWriter;

>>>>>>> 25515533c59f5eac67869b15f8eeb5634a475e30
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
<<<<<<< HEAD
import java.io.IOException;
import java.io.PrintWriter;
=======
>>>>>>> 25515533c59f5eac67869b15f8eeb5634a475e30

@WebServlet("/remove") 
public class Remove extends HttpServlet {   
@Override 
protected void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
	System.out.println("GET Request received - Remove note");
	Integer noteId = Integer.parseInt(request.getParameter("note_id"));
	DAO dao = new DAO();
	dao.remove(noteId);
	PrintWriter out = response.getWriter();
	out.println("SUCCESS");
}
   
@Override 
protected void doPost(HttpServletRequest request,HttpServletResponse response)
		throws ServletException, IOException { 
		}

}