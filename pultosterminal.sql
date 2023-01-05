-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2022. Jún 11. 18:29
-- Kiszolgáló verziója: 5.7.31
-- PHP verzió: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `pultosterminal`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csoportok`
--

DROP TABLE IF EXISTS `csoportok`;
CREATE TABLE IF NOT EXISTS `csoportok` (
  `nev` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visible` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `csoportok`
--

INSERT INTO `csoportok` (`nev`, `id`, `visible`) VALUES
('Koktélok', 1, 1),
('Bor', 2, 1),
('Pálinka', 3, 1),
('Sörök', 4, 1),
('Egyebek', 5, 1),
('Üdítők', 6, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `forgalom`
--

DROP TABLE IF EXISTS `forgalom`;
CREATE TABLE IF NOT EXISTS `forgalom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_id` int(11) NOT NULL,
  `termekid` int(11) DEFAULT NULL,
  `db` int(11) DEFAULT NULL,
  `eladottbeszar` int(11) DEFAULT NULL,
  `eladottelar` int(11) DEFAULT NULL,
  `eladottdate` varchar(45) DEFAULT NULL,
  `xkimeresnevid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_forgalom_transactions1_idx` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kevert`
--

DROP TABLE IF EXISTS `kevert`;
CREATE TABLE IF NOT EXISTS `kevert` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `termek_id` int(11) NOT NULL,
  `adalek_id` int(11) NOT NULL,
  `xkimeresnev_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_kevert_termekek1_idx` (`termek_id`),
  KEY `fk_kevert_termekek2_idx` (`adalek_id`),
  KEY `fk_kevert_xkimeresnev1_idx` (`xkimeresnev_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kiszereles`
--

DROP TABLE IF EXISTS `kiszereles`;
CREATE TABLE IF NOT EXISTS `kiszereles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `urtartalom` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kiszereles`
--

INSERT INTO `kiszereles` (`id`, `nev`, `urtartalom`) VALUES
(1, 'Kevert italok', 0),
(2, 'Kimért italok', 0),
(3, 'Üveg', 50),
(4, 'darab', 100);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `koktel`
--

DROP TABLE IF EXISTS `koktel`;
CREATE TABLE IF NOT EXISTS `koktel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `koktelnev`
--

DROP TABLE IF EXISTS `koktelnev`;
CREATE TABLE IF NOT EXISTS `koktelnev` (
  `id` int(11) NOT NULL,
  `nev` varchar(11) COLLATE utf8_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termekek`
--

DROP TABLE IF EXISTS `termekek`;
CREATE TABLE IF NOT EXISTS `termekek` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `beszar` int(11) DEFAULT NULL,
  `elar` int(11) DEFAULT NULL,
  `leltarozando` varchar(1) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `kritikus` int(11) DEFAULT NULL,
  `gyujto` int(11) DEFAULT NULL,
  `emailsend` tinyint(4) DEFAULT '0',
  `leltar` int(11) DEFAULT NULL,
  `urtartalom` int(11) DEFAULT NULL,
  `keszlet` int(11) DEFAULT NULL,
  `cl` int(11) DEFAULT NULL,
  `sumcl` int(11) DEFAULT NULL,
  `kiszereles_id` int(11) NOT NULL,
  `csoport_id` int(11) NOT NULL,
  `visible` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`,`nev`),
  KEY `fk_termekek_kiszereles1_idx` (`kiszereles_id`),
  KEY `fk_termekek_csoportok1_idx` (`csoport_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `termekek`
--

INSERT INTO `termekek` (`id`, `nev`, `beszar`, `elar`, `leltarozando`, `kritikus`, `gyujto`, `emailsend`, `leltar`, `urtartalom`, `keszlet`, `cl`, `sumcl`, `kiszereles_id`, `csoport_id`, `visible`) VALUES
(1, 'Belga söröm', 123, 234, 'i', 1, 1, 0, NULL, 50, 11, 1, 1, 3, 4, 1),
(2, 'vodka', 2222, 4444, 'i', 1, 1, 0, NULL, 150, 22, 150, 3250, 2, 3, 1),
(3, 'Kőbányi homályos', 111, 222, 'i', 1, 1, 0, NULL, 100, 11, 1, 11, 3, 3, 1),
(4, 'Szőke cóla', 22, 33, 'i', 2, 2, 0, NULL, 200, 2, 1, 2, 3, 6, 1),
(5, 'Barna cóla', 44, 555, 'i', 4, 4, 0, NULL, 400, 4, 1, 4, 3, 6, 1),
(6, 'Kávé', 22, 33, 'n', 2, 2, 0, NULL, 200, 22, 1, 22, 4, 5, 1),
(7, 'Egri bikavér', 555, 666, 'i', 5, 5, 0, NULL, 100, 55, 1, 55, 3, 2, 1),
(8, 'Kocsis Irma', 222, 333, 'n', 22, 2, 0, NULL, 200, 22, 1, 22, 3, 2, 1),
(9, 'csoki', 222, 333, 'i', 2, 2, 0, NULL, 100, 22, 1, 22, 4, 5, 1),
(10, 'mittomén', 3333, 4444, 'i', 1, 1, 0, NULL, 100, 1, 1, 1, 3, 5, 1),
(11, 'Napóleon konyak', 3333, 4444, 'i', 1, 1, 0, NULL, 100, 11, 1, 11, 3, 3, 1),
(12, 'teszt termék', 333, 444, 'i', 1, 1, 0, NULL, 100, 1, 1, 1, 4, 5, 1),
(13, 'boros teszt', 222, 333, 'n', 1, 1, 0, NULL, 100, 1, 1, 1, 3, 2, 1),
(14, 'Ucso teszt', 1111, 222, 'i', 11, 1, 0, NULL, 100, 1, 1, 1, 4, 5, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trnumber` varchar(45) DEFAULT NULL,
  `trdate` varchar(45) DEFAULT NULL,
  `trfizetesmod` varchar(45) DEFAULT NULL,
  `megjegyzes` varchar(100) DEFAULT NULL,
  `pultos` int(11) DEFAULT NULL,
  `kibeosszeg` int(11) DEFAULT NULL,
  `kibeosszegbeszar` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `xkimeres`
--

DROP TABLE IF EXISTS `xkimeres`;
CREATE TABLE IF NOT EXISTS `xkimeres` (
  `nev` varchar(50) DEFAULT NULL,
  `termek_id` int(11) NOT NULL,
  `termek_nev` varchar(50) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `xkimeresnev_id` int(11) NOT NULL,
  KEY `fk_xkimeres_termekek1_idx` (`termek_id`,`termek_nev`),
  KEY `fk_xkimeres_xkimeresnev1_idx` (`xkimeresnev_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `xkimeres`
--

INSERT INTO `xkimeres` (`nev`, `termek_id`, `termek_nev`, `xkimeresnev_id`) VALUES
(NULL, 2, 'vodka', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `xkimeresnev`
--

DROP TABLE IF EXISTS `xkimeresnev`;
CREATE TABLE IF NOT EXISTS `xkimeresnev` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(50) DEFAULT NULL,
  `urtartalom` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `xkimeresnev`
--

INSERT INTO `xkimeresnev` (`id`, `nev`, `urtartalom`) VALUES
(1, 'pikoló', 20),
(2, 'pohár', 30),
(3, 'korsó', 50);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `forgalom`
--
ALTER TABLE `forgalom`
  ADD CONSTRAINT `fk_forgalom_transactions1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `kevert`
--
ALTER TABLE `kevert`
  ADD CONSTRAINT `fk_kevert_termekek1` FOREIGN KEY (`termek_id`) REFERENCES `termekek` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_kevert_termekek2` FOREIGN KEY (`adalek_id`) REFERENCES `termekek` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_kevert_xkimeresnev1` FOREIGN KEY (`xkimeresnev_id`) REFERENCES `xkimeresnev` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `termekek`
--
ALTER TABLE `termekek`
  ADD CONSTRAINT `fk_termekek_csoportok1` FOREIGN KEY (`csoport_id`) REFERENCES `csoportok` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_termekek_kiszereles1` FOREIGN KEY (`kiszereles_id`) REFERENCES `kiszereles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `xkimeres`
--
ALTER TABLE `xkimeres`
  ADD CONSTRAINT `fk_xkimeres_termekek1` FOREIGN KEY (`termek_id`,`termek_nev`) REFERENCES `termekek` (`id`, `nev`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_xkimeres_xkimeresnev1` FOREIGN KEY (`xkimeresnev_id`) REFERENCES `xkimeresnev` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
