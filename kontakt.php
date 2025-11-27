<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kontakt_baza";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) die("Greška pri povezivanju: " . $conn->connect_error);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "Forma nije poslana!";
    exit;
}

$ime = trim($_POST['ime']);
$prezime = trim($_POST['prezime']);
$email = trim($_POST['email']);
$telefon = trim($_POST['telefon']);
$poruka = trim($_POST['poruka']);
$pristanak = isset($_POST['pristanak']) && $_POST['pristanak'] == 1;

// Backend validacija
if (empty($ime) || empty($prezime) || empty($email) || empty($telefon) || empty($poruka)) {
    echo "Sva polja moraju biti popunjena!";
    exit;
}

if (!preg_match("/^[A-Za-zčćšđžČĆŠĐŽ ]+$/u", $ime)) echo "Ime može sadržavati samo slova!" and exit;
if (!preg_match("/^[A-Za-zčćšđžČĆŠĐŽ ]+$/u", $prezime)) echo "Prezime može sadržavati samo slova!" and exit;
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) echo "Email nije validan!" and exit;
if (!preg_match("/^[0-9]{9,12}$/", $telefon)) echo "Broj telefona mora imati 9-12 cifara!" and exit;
if (!$pristanak) echo "Morate prihvatiti uslove obrade podataka!" and exit;

$stmt = $conn->prepare("INSERT INTO kontakt_podaci (ime, prezime, email, telefon, poruka) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $ime, $prezime, $email, $telefon, $poruka);

if ($stmt->execute()) echo "Poruka je uspješno poslana!";
else echo "Greška prilikom slanja: " . $stmt->error;

$stmt->close();
$conn->close();
?>
