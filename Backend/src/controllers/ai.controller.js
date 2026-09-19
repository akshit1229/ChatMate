import { generateAIResponse } from "../lib/groq.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Public robot avatar as a fallback placeholder
const AI_AVATAR_URL =
  "https://api.dicebear.com/7.x/bottts/svg?seed=chatmate-ai";

export const setupAIUser = async () => {
  try {
    // Check if AI user exists
    let aiUser = await User.findOne({ email: "ai@chatmate.com" });

    // If not, create it
    if (!aiUser) {
      aiUser = new User({
        email: "ai@chatmate.com",
        fullName: "ChaTai",
        password: await bcrypt.hash(
          Math.random().toString(36) + Date.now().toString(36),
          10
        ),
        profilePic: AI_AVATAR_URL,
      });
      await aiUser.save();
      console.log("AI assistant account created with ID:", aiUser._id);
    }

    return aiUser._id;
  } catch (error) {
    console.error("Error setting up AI user:", error);
    return null;
  }
};

export const sendMessageToAI = async (req, res) => {
  try {
    const { text } = req.body;
    const senderId = req.user._id;

    // Get AI user
    const aiUser = await User.findOne({ email: "ai@chatmate.com" });
    if (!aiUser) {
      return res.status(500).json({ error: "AI assistant not configured" });
    }

    // Fetch the last 10 messages for conversation history context
    const recentMessages = await Message.find({
      $or: [
        { senderId, receiverId: aiUser._id },
        { senderId: aiUser._id, receiverId: senderId },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Reverse to chronological order and build history array
    const history = recentMessages
      .reverse()
      .map((msg) => ({
        role: msg.senderId.toString() === senderId.toString() ? "user" : "assistant",
        content: msg.text,
      }));

    // Save user message
    const userMessage = new Message({
      senderId,
      receiverId: aiUser._id,
      text,
    });
    await userMessage.save();

    // Generate AI response with conversation history
    const aiResponse = await generateAIResponse(text, history);

    // Save AI response
    const aiMessage = new Message({
      senderId: aiUser._id,
      receiverId: senderId,
      text: aiResponse,
    });
    await aiMessage.save();

    // Return both messages
    res.status(200).json({
      userMessage,
      aiMessage,
    });
  } catch (error) {
    console.error("Error in AI message controller:", error);
    res.status(500).json({ error: "Failed to process AI message" });
  }
};

export const toggleAIChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    user.aiChatEnabled = !user.aiChatEnabled;
    await user.save();

    res.status(200).json({ aiChatEnabled: user.aiChatEnabled });
  } catch (error) {
    console.error("Error toggling AI chat:", error);
    res.status(500).json({ error: "Failed to toggle AI chat" });
  }
};
