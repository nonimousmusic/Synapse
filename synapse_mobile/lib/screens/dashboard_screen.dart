import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppProvider>();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Row(
          children: [
            const Icon(Icons.blur_on, color: Color(0xFF22D3EE)),
            const SizedBox(width: 8),
            Text(
              'SYNAPSE MOBILE',
              style: TextStyle(
                fontFamily: 'Inter',
                fontWeight: FontWeight.w900,
                fontSize: 16,
                letterSpacing: 1.2,
                color: Colors.white.withOpacity(0.9),
              ),
            ),
          ],
        ),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            // Hero Stats
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF0E0E18),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF7C3AED).withOpacity(0.3)),
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    const Color(0xFF7C3AED).withOpacity(0.15),
                    const Color(0xFF22D3EE).withOpacity(0.05),
                  ],
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Day ${state.currentDay}',
                        style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w900, color: Colors.white),
                      ),
                      Text(
                        'Bootcamp Progression',
                        style: TextStyle(fontSize: 12, color: Colors.white.withOpacity(0.6)),
                      ),
                    ],
                  ),
                  Container(
                    width: 64,
                    height: 64,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: const Color(0xFF22D3EE), width: 3),
                    ),
                    child: Center(
                      child: Text(
                        '${state.growthScore}%',
                        style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF22D3EE)),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            
            // Today's Mission
            Text(
              "TODAY'S MISSION",
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.5,
                color: Colors.white.withOpacity(0.5),
              ),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF0E0E18),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white.withOpacity(0.05)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFF10B981).withOpacity(0.1),
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(color: const Color(0xFF10B981).withOpacity(0.3)),
                        ),
                        child: const Text('ACTIVE', style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Neural Network Optimization',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Learn the mechanics of backpropagation and gradient descent optimization strategies in deep learning models.',
                    style: TextStyle(fontSize: 14, color: Colors.white.withOpacity(0.7), height: 1.5),
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/session');
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF7C3AED),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      child: const Text('Initialize Neural Link →', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            
            // Note about Day 15 omission
            if (state.currentDay >= 14 && state.currentDay < 16)
               Container(
                 padding: const EdgeInsets.all(12),
                 decoration: BoxDecoration(
                   color: const Color(0xFFF59E0B).withOpacity(0.1),
                   borderRadius: BorderRadius.circular(8),
                   border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.3)),
                 ),
                 child: Row(
                   children: [
                     const Icon(Icons.info_outline, color: Color(0xFFF59E0B), size: 16),
                     const SizedBox(width: 8),
                     Expanded(
                       child: Text(
                         'Mobile Version Note: The Day 15 Mandatory Milestone is bypassed in this environment. You may proceed seamlessly.',
                         style: TextStyle(color: const Color(0xFFF59E0B), fontSize: 12),
                       ),
                     ),
                   ],
                 ),
               )
          ],
        ),
      ),
    );
  }
}
