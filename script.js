document.addEventListener('DOMContentLoaded', () => {
    // Elemen DOM
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizContainer = document.getElementById('quiz-container');
    const startButton = document.getElementById('startButton');
    const submitButton = document.getElementById('submitButton');
    const userNameInput = document.getElementById('userName');
    const quizHeader = document.getElementById('quiz-header');
    const resultDiv = document.getElementById('result');
    const backgroundSong = document.getElementById('interstellar.mp3');

    // Kunci Jawaban (sesuai dengan nilai 'value' pada input radio di HTML)
    const correctAnswers = {
        q1: 'b', q2: 'c', q3: 'a', q4: 'b', q5: 'b',
        q6: 'b', q7: 'a', q8: 'c', q9: 'b', q10: 'b',
        q11: 'b', q12: 'b', q13: 'a', q14: 'b', q15: 'b',
        q16: 'b', q17: 'b', q18: 'b', q19: 'b', q20: 'b'
    };
    const totalQuestions = 20;

    // Fungsi untuk memulai kuis
    startButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        if (userName === "") {
            alert("Mohon masukkan nama Anda!");
            return;
        }

        // Tampilkan nama di header kuis
        quizHeader.textContent = `Selamat Mengerjakan, ${userName}!`;

        // Sembunyikan layar selamat datang dan tampilkan kuis
        welcomeScreen.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        
        // Putar musik latar
        backgroundSong.play().catch(error => {
            console.log("Pemutaran musik diblokir oleh browser. Diperlukan interaksi pengguna.");
        });
    });

    // Fungsi untuk menghitung nilai
    submitButton.addEventListener('click', () => {
        const form = document.getElementById('quiz-form');
        const formData = new FormData(form);
        let score = 0;
        let unanswered = 0;

        // Iterasi melalui semua pertanyaan untuk memeriksa jawaban
        for (let i = 1; i <= totalQuestions; i++) {
            const question = `q${i}`;
            const userAnswer = formData.get(question);

            if (userAnswer === null) {
                unanswered++;
            } else if (userAnswer === correctAnswers[question]) {
                score++;
            }
        }
        
        if (unanswered > 0) {
            alert(`Anda belum menjawab ${unanswered} pertanyaan. Mohon lengkapi semua jawaban!`);
            return;
        }

        // Hitung nilai akhir
        const finalScore = (score / totalQuestions) * 100;
        const incorrectAnswers = totalQuestions - score;

        // Tampilkan hasil
        resultDiv.innerHTML = `
            <h2>Hasil Kuis Anda</h2>
            <p><strong>Jawaban Benar:</strong> ${score}</p>
            <p><strong>Jawaban Salah:</strong> ${incorrectAnswers}</p>
            <h3>Nilai Akhir: ${finalScore.toFixed(0)}</h3>
        `;
        resultDiv.classList.remove('hidden');
        
        // Gulir ke hasil
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
});
