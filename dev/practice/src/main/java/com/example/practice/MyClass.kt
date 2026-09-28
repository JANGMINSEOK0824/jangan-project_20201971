package com.example.practice

fun main() {
    val attendance = 85   // 출석률(%)
    val score = 96        // 점수

    if (attendance < 80) {
        println("F (낙제)")
    } else {
        if (score >= 95) {
            println("A+ 학점")
            println("장학생 선발 대상")
        } else if (score >= 90) {
            println("A 학점")
        } else if (score >= 80) {
            println("B 학점")
        } else if (score >= 70) {
            println("C 학점")
        } else {
            println("F 학점")
        }
    }
}