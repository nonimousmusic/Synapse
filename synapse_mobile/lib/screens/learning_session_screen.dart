import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../services/ai_service.dart';

class LearningSessionScreen extends StatefulWidget {
  const LearningSessionScreen({Key? key}) : super(key: key);

  @override
  State<LearningSessionScreen> createState() => _LearningSessionScreenState();
}

class _LearningSessionScreenState extends State<LearningSessionScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Map<String, String>> _messages = [
    {
      'role': 'assistant',
      'content': 'Neural link established. I am Vishesh. We are bypassing the Day 15 oral validation protocol on mobile. Are you ready to proceed with today\'s optimization algorithms?',
    }
  ];
  bool _isLoading = false;

  Future<void> _sendMessage() async {
    final text = _controller.text.trim();
    if (text.isEmpty) return;

    setState(() {
      _messages.add({'role': 'user', 'content': text});
      _isLoading = true;
    });
    _controller.clear();

    final response = await AIService.generateResponse(text);

    setState(() {
      _messages.add({'role': 'assistant', 'content': response});
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final state = context.read<AppProvider>();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0A0A12),
        title: Row(
          children: [
            Container(
              width: 32, height: 32,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                gradient: LinearGradient(colors: [Color(0xFF7C3AED), Color(0xFF22D3EE)]),
              ),
              child: const Center(child: Text('V', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16))),
            ),
            const SizedBox(width: 12),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Vishesh AI', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                Text('Active Neural Link', style: TextStyle(fontSize: 10, color: Color(0xFF22D3EE))),
              ],
            )
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              state.completeDailyLesson();
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Session completed. Progressing seamlessly.')),
              );
            },
            child: const Text('END SESSION', style: TextStyle(color: Color(0xFF10B981))),
          )
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isUser = msg['role'] == 'user';
                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 16),
                    padding: const EdgeInsets.all(16),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
                    decoration: BoxDecoration(
                      color: isUser ? const Color(0xFF7C3AED).withOpacity(0.2) : const Color(0xFF161622),
                      borderRadius: BorderRadius.only(
                        topLeft: const Radius.circular(16),
                        topRight: const Radius.circular(16),
                        bottomLeft: Radius.circular(isUser ? 16 : 4),
                        bottomRight: Radius.circular(isUser ? 4 : 16),
                      ),
                      border: Border.all(
                        color: isUser ? const Color(0xFF7C3AED).withOpacity(0.5) : Colors.white.withOpacity(0.05),
                      ),
                    ),
                    child: Text(
                      msg['content'] ?? '',
                      style: TextStyle(color: Colors.white.withOpacity(0.9), fontSize: 14, height: 1.5),
                    ),
                  ),
                );
              },
            ),
          ),
          if (_isLoading)
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: LinearProgressIndicator(
                backgroundColor: Color(0xFF0E0E18),
                valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF7C3AED)),
              ),
            ),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: Color(0xFF0A0A12),
              border: Border(top: BorderSide(color: Color(0xFF1E1E2D))),
            ),
            child: SafeArea(
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      style: const TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                        hintText: 'Transmit query to Vishesh...',
                        hintStyle: TextStyle(color: Colors.white.withOpacity(0.3)),
                        filled: true,
                        fillColor: const Color(0xFF161622),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                          borderSide: BorderSide.none,
                        ),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
                      ),
                      onSubmitted: (_) => _sendMessage(),
                    ),
                  ),
                  const SizedBox(width: 12),
                  GestureDetector(
                    onTap: _sendMessage,
                    child: Container(
                      width: 48, height: 48,
                      decoration: const BoxDecoration(
                        color: Color(0xFF7C3AED),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.send, color: Colors.white, size: 20),
                    ),
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
