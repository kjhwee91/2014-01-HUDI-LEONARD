package test;


import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.DURU.dao.MainFeaturedDAO;

public class DBshowServlet extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
		System.out.println("servlet connection");
		
		MainFeaturedDAO mfc = new MainFeaturedDAO();
		mfc.makeShowVideoList();
//		JSONArray rows = mfc.getRows();
//		
//		request.setAttribute("data", rows);
//		RequestDispatcher dispatcher = request.getRequestDispatcher("dbshow.jsp");
//		dispatcher.forward(request, response);
	}
}
