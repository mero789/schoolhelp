-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2019 at 04:32 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `schoolhelp`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `madeBy` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `title`, `description`, `madeBy`) VALUES
(0, 'a', 'a', ''),
(0, 'a', 'a', ''),
(0, 'aaaa', 'aaaaa', ''),
(0, 'aaaa', 'aaaaa', ''),
(0, 'aaaa', 'aaaaa', ''),
(0, 'aaaa', 'aaaaa', ''),
(0, 'aaaa', 'aaaaa', ''),
(0, 'aaaa', 'aaaaa', ''),
(0, 'aaaa', 'aaaaa', ''),
(0, 'aaa', 'aaa', ''),
(0, 'aaa', 'aaa', ''),
(0, 'aaa', 'aaa', ''),
(0, 'e', 'e', ''),
(0, 'a', 'a', ''),
(39, 're', 're', ''),
(39, 'a', 'a', '');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `madeBy` varchar(255) NOT NULL,
  `question` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `answer` longtext NOT NULL,
  `upvotes` bigint(20) NOT NULL DEFAULT '0',
  `downvotes` bigint(20) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `madeBy`, `question`, `description`, `answer`, `upvotes`, `downvotes`) VALUES
(32, 'uwu', 'Testing the vote system', 'Ok so im basically testing our vote system', '', 1, 0),
(37, 'uwu', 'REEEEEEEE', 'REEEEEEEEEEEEEEEEEEEEEEEEEEEE', '', 0, 0),
(38, 'uwu', 'aa', 'aa', '', 0, 0),
(39, 'uwu', 'a', 'a', '', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(10, 'qqqq', '', 'qqqq'),
(11, 'Ameer Hamoodi', '', 'pricey31'),
(12, 'anflansnasl', '', 'asfaf'),
(13, 'Mero Hamo', '', 'pricey31'),
(14, 'www', '', 'pricey31'),
(15, 'uwu', 'ahamoodi178@gmail.com', 'pricey31'),
(16, 'mero789y', 'chiplover789@gmail.com', 'pricey31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
