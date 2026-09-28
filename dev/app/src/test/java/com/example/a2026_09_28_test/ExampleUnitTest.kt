package com.example.a2026_09_28_test

import org.junit.Test

class ExampleUnitTest {
    @Test
    fun operator_test() {
        val a = 10
        val b = 3

        // 산술 연산자
        println("a + b = ${a + b}")          // 13
        println("a - b = ${a - b}")          // 7
        println("a * b = ${a * b}")          // 30
        println("a / b = ${a / b}")          // 3 (정수끼리 나누면 소수점 버림)
        println("a % b = ${a % b}")          // 1 (나머지)
        println("10.0 / 3 = ${10.0 / 3}")    // 3.3333333333333335

        // 대입 연산자
        var num = 10
        num += 5    // 15
        num -= 3    // 12
        num *= 2    // 24
        num /= 4    // 6
        num %= 4    // 2
        println("num = $num")                // 2

        // 증감 연산자
        var count = 5
        count++
        println("count++ 후: $count")        // 6
        count--
        println("count-- 후: $count")        // 5

        // 비교 연산자
        println("a > b : ${a > b}")          // true
        println("a < b : ${a < b}")          // false
        println("a >= 10 : ${a >= 10}")      // true
        println("a == b : ${a == b}")        // false
        println("a != b : ${a != b}")        // true

        // 논리 연산자
        val x = true
        val y = false
        println("x && y : ${x && y}")        // false
        println("x || y : ${x || y}")        // true
        println("!x : ${!x}")                // false

        // 범위 연산자 / in 연산자
        println("5 in 1..10 : ${5 in 1..10}")  // true
    }
}