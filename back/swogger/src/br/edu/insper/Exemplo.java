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

// FRED E BRUNA

@WebServlet("/submit")
public class Exemplo extends HttpServlet {
<<<<<<< HEAD
	 protected void service (HttpServletRequest request,HttpServletResponse response)
		 throws ServletException, IOException {
			 PrintWriter out = response.getWriter();
			 String nome = request.getParameter("nome");
			 String email = request.getParameter("email");
			 String curso = request.getParameter("curso");
			 System.out.println(nome);
			 out.println("<html>");
			 out.println("<body>");
			 out.println("Você adicionou o nome:" + nome + "<br>");
			 out.println("Que cursa:" + curso + "<br>");
			 out.println("Email :" + email);
			 out.println("</body>");
			 out.println("</html>");
		 }
=======
 protected void service (HttpServletRequest request,HttpServletResponse response)
	 throws ServletException, IOException {
		 PrintWriter out = response.getWriter();
		 String nome = request.getParameter("nome");
		 String email = request.getParameter("email");
		 String curso = request.getParameter("curso");
		 System.out.println(nome);
		 out.println("<html>");
		 out.println("<body>");
		 out.println("Você adicionou o nome:" + nome + "<br>");
		 out.println("Que cursa:" + curso + "<br>");
		 out.println("Email :" + email);
		 out.println("</body>");
		 out.println("</html>");
	 }
>>>>>>> 25515533c59f5eac67869b15f8eeb5634a475e30
}