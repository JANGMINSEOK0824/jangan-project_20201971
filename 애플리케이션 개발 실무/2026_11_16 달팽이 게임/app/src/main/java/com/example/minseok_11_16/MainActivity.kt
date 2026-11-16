package com.example.minseok_11_16

import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.activity.ComponentActivity

class MainActivity : ComponentActivity() {
    // 1. 변수 선언
    lateinit var ivShell: ImageView
    lateinit var tvResult: TextView
    lateinit var btnRetry: Button
    lateinit var btns: List<ImageButton>
    val shells = listOf(R.drawable.shell1, R.drawable.shell2, R.drawable.shell3, R.drawable.shell4)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 2. R.id 로 찾기
        ivShell = findViewById(R.id.ivShell)
        tvResult = findViewById(R.id.tvResult)
        btnRetry = findViewById(R.id.btnRetry)
        btns = listOf(R.id.btn1, R.id.btn2, R.id.btn3, R.id.btn4).map { findViewById(it) }

        // 3. 이벤트 처리
        btns.forEachIndexed { i, btn ->
            btn.setOnClickListener {
                val ok = i == 1 // 2번이 정답
                ivShell.setImageResource(shells[i])
                ivShell.visibility = View.VISIBLE
                tvResult.text = if (ok) "정답이에요! 🎉" else "틀렸어요 😢"
                tvResult.setTextColor(if (ok) Color.BLUE else Color.RED)
                if (ok) setPlaying(false)
            }
        }
        btnRetry.setOnClickListener {
            ivShell.visibility = View.INVISIBLE
            tvResult.text = ""
            setPlaying(true)
        }
    }

    fun setPlaying(on: Boolean) {
        btns.forEach { it.isEnabled = on }
        btnRetry.visibility = if (on) View.GONE else View.VISIBLE
    }
}
