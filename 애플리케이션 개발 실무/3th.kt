package com.example

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 불변 변수 val / 가변 변수 var
        val myName = "홍길동"
        val age: Int = 25
        Log.d("코틀린 : 불변 변수 val ", "나의 이름은 " + myName + ", 나이는 " + age)
        var myAge = 20
        myAge = 25
        var score: Int = 90
        score = 95
        Log.d("코틀린 : 가변 변수 var ", "myAge : " + myAge + ", score : " + score)

        // 정수 자료형 (슬라이드)
        var numOne = 1
        var numTwo = 3000000000
        var myByte: Byte = 1
        var myInt: Int = 20
        var myLong = 25L            // 명시적 Long형 지정
        Log.d("코틀린 : 정수 자료형 ", "Int : " + numOne)
        Log.d("코틀린 : 정수 자료형 ", "Long : " + numTwo)
        Log.d("코틀린 : 정수 자료형 ", "Byte : " + myByte)
        Log.d("코틀린 : 정수 자료형 ", "Int : " + myInt)
        Log.d("코틀린 : 정수 자료형 ", "Long : " + myLong)

        // 실수, 문자, 논리, 문자열
        var myFloat: Float = 3.14f
        var myDouble: Double = 3.14
        var myChar: Char = 'A'
        var myBoolean: Boolean = true
        var myString: String = "안녕"
        Log.d("코틀린 : 실수 자료형 ", "Float : " + myFloat)
        Log.d("코틀린 : 실수 자료형 ", "Double : " + myDouble)
        Log.d("코틀린 : 문자 자료형 ", "Char : " + myChar)
        Log.d("코틀린 : 논리 자료형 ", "Boolean : " + myBoolean)
        Log.d("코틀린 : 문자열 자료형 ", "String : " + myString)

        // 배열
        val intArray = intArrayOf(1, 2, 3)
        val strArray = arrayOf("사과", "배", "포도")
        Log.d("코틀린 : 배열 ", "intArray : " + intArray.contentToString())
        Log.d("코틀린 : 배열 ", "strArray[1] : " + strArray[1])
        Log.d("코틀린 : 배열 ", "strArray 크기 : " + strArray.size)
        //intArray[0] = 10
        Log.d("코틀린 : 배열 ", "변경 후 intArray[0] : " + intArray[0])
    }
}