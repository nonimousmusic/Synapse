import 'dart:convert';
import 'package:http/http.dart' as http;

class AIService {
  // Use 10.0.2.2 for Android Emulator to hit localhost of the host machine
  // Use localhost for iOS simulator
  static const String _ollamaUrl = 'http://127.0.0.1:11434/api/generate';

  static Future<String> generateResponse(String prompt) async {
    try {
      final response = await http.post(
        Uri.parse(_ollamaUrl),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'model': 'llama3',
          'prompt': 'You are Vishesh, an elite AI technical mentor for Synapse. Keep responses concise and technical. User said: $prompt',
          'stream': false,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['response'] ?? 'Processing error.';
      } else {
        return 'Neural link disrupted. Error: ${response.statusCode}';
      }
    } catch (e) {
      return 'Neural link connection failed. Ensure local Ollama is running.\nException: $e';
    }
  }
}
