import 'package:flutter/foundation.dart';

class AppProvider with ChangeNotifier {
  int currentDay = 14; // Start near day 15 to demonstrate seamless progression
  int streak = 14;
  int growthScore = 82;
  
  Map<String, int> scores = {
    'technical': 72,
    'communication': 81,
    'problemSolving': 68,
    'velocity': 78,
  };

  void completeDailyLesson() {
    // Progressing seamlessly without the Day 15 mandatory test lock.
    if (currentDay < 30) {
      currentDay++;
      streak++;
      growthScore += 1;
      notifyListeners();
    }
  }

  void updateScores(Map<String, int> newScores) {
    scores.addAll(newScores);
    notifyListeners();
  }
}
