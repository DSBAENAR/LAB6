package com.bbapp.bbapstarter.Services;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.stereotype.Component;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@Component
@ServerEndpoint("/bbService")
public class BBEndpoint {

    private static Logger logger = Logger.getLogger(BBEndpoint.class.getName());
    static Queue<Session> queue = new ConcurrentLinkedQueue<>();

    Session owSession = null;

    public void send(String msg){
        try{
            for (Session session : queue){
                if (!session.equals(this.owSession)) {
                    session.getBasicRemote().sendText(msg);
                }
                logger.log(Level.INFO, "Sent: {0}", msg);
                
            }
        } catch (Exception e){
            logger.log(Level.INFO , e.toString());
        }
    }

    @OnMessage
    public void processPoint(String msg, Session session){
        System.out.println("Point received: " + msg + ". From Session: " + session);
    }

    @OnOpen
    public void openConnection(Session session){
        queue.add(session);
        owSession = session;
        logger.log(Level.INFO, "Connection opened.");
        try{
            session.getBasicRemote().sendText("Connection established.");
        }
        catch (Exception e){
            logger.log(Level.INFO , e.toString());
        }
    }

    @OnClose
    public void closedConnection(Session session) {
        queue.remove(session);
        logger.log(Level.INFO, "Connection closed.");   
    }

    @OnError
    public void error(Session session, Throwable t) {
        queue.remove(session);
        logger.log(Level.INFO, t.toString());
        logger.log(Level.INFO, "Connection error.");
    }

}
