package br.edu.insper;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// FRED E BRUNA

@WebServlet("/submit")
public class Exemplo extends HttpServlet {
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
}