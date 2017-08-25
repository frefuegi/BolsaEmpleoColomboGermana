-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 25, 2017 at 04:36 PM
-- Server version: 10.1.20-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id1038231_bolsa`
--

-- --------------------------------------------------------

--
-- Table structure for table `celular`
--

CREATE TABLE `celular` (
  `id_NoCelular` int(11) NOT NULL,
  `Celular` int(11) NOT NULL,
  `id_Estudiante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conocimientos`
--

CREATE TABLE `conocimientos` (
  `id_conocimiento` int(11) NOT NULL,
  `id_estudiante` int(20) NOT NULL,
  `conocimiento` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `porcentaje` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `correo`
--

CREATE TABLE `correo` (
  `id_correo` int(11) NOT NULL,
  `Correo` int(11) NOT NULL,
  `id_Estudiante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `empresa`
--

CREATE TABLE `empresa` (
  `id_empresa` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `direccion` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `telefono` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `celular_contacto` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_contacto` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `apellido_contacto` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `cargo_contacto` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `empresa`
--

INSERT INTO `empresa` (`id_empresa`, `nombre`, `direccion`, `telefono`, `celular_contacto`, `nombre_contacto`, `apellido_contacto`, `cargo_contacto`, `descripcion`) VALUES
(7, 'Seguros Fallabella', 'Diag 56 No 34 97', '2314564', '3114567989', 'Antonio ', 'Pedraza', 'Psicólogo de Seleccion', 'Empresa del sector asegurador'),
(8, 'Bavaria', 'Av Boyaca No 6 -36', '4561232', '31245678', 'Pedro', 'Perez', 'Asistente de Personal', 'Empresa productora de gaseosas y cervezas'),
(9, 'El Tiempo', 'Calle 26 no 69 48', '456123', '321324564', 'Eduardo', 'Santos', 'Director', 'Periodico de Bogota');

-- --------------------------------------------------------

--
-- Table structure for table `estudiante`
--

CREATE TABLE `estudiante` (
  `id_usuario` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `direccion` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `tipo_documento` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `documento` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `carrera` int(20) NOT NULL,
  `perfil` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `dia_mes_Semana` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `dia_mes_fines_semana` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `semestre` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `promedio_notas` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `estado_civil` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `hijos` int(11) NOT NULL,
  `objetivos_profesionales` varchar(11) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `estudiante`
--

INSERT INTO `estudiante` (`id_usuario`, `id_estudiante`, `nombre`, `apellido`, `direccion`, `fecha_nacimiento`, `tipo_documento`, `documento`, `carrera`, `perfil`, `dia_mes_Semana`, `dia_mes_fines_semana`, `semestre`, `promedio_notas`, `estado_civil`, `hijos`, `objetivos_profesionales`) VALUES
(1, 1, 'javier', 'barajas', 'diag 56 ', '2017-03-07', 'cedula', '80912422', 0, 'desarrollador', '3', '1', '6', '4', 'casado', 1, 'trabajas');

-- --------------------------------------------------------

--
-- Table structure for table `estudios_basicos`
--

CREATE TABLE `estudios_basicos` (
  `id_estudio` int(5) NOT NULL,
  `id_estudiante` int(20) DEFAULT NULL,
  `fecha_grado` date DEFAULT NULL,
  `titulo` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `institucion` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `estudios_basicos`
--

INSERT INTO `estudios_basicos` (`id_estudio`, `id_estudiante`, `fecha_grado`, `titulo`, `institucion`) VALUES
(8, 1, '2017-06-10', 'TECNÓLOGO EN SISTEMAS INFORMÁTICOS', 'Fundación Tecnológica Colombo Germana'),
(9, 1, '2017-06-24', 'GESTIÓN DE NEGOCIOS INTERNACIONALES', 'Fundación Tecnológica Colombo Germana'),
(10, 1, '2017-07-08', 'GESTIÓN CONTABLE Y TRIBUTARIA', 'Fundación Tecnológica Colombo Germana'),
(11, 1, '2017-07-08', 'GESTIÓN EMPRESARIAL', 'Fundación Tecnológica Colombo Germana'),
(12, 1, '2017-08-12', 'GASTRONOMÍA Y COCINA', 'Fundación Tecnológica Colombo Germana'),
(13, 1, '2017-09-02', 'GESTIÓN TURÍSTICA Y HOTELERA', 'Fundación Tecnológica Colombo Germana'),
(14, 1, '2017-06-17', 'DISEÑO GRÁFICO MULTIMEDIA', 'Fundación Tecnológica Colombo Germana'),
(15, 1, '2017-11-04', 'ELECTRÓNICA INDUSTRIAL', 'Fundación Tecnológica Colombo Germana');

-- --------------------------------------------------------

--
-- Table structure for table `experiencia`
--

CREATE TABLE `experiencia` (
  `id_experiencia` int(11) NOT NULL,
  `id_estudiante` int(11) DEFAULT NULL,
  `fecha_ingreso` date NOT NULL,
  `fecha_salida` date NOT NULL,
  `cargo` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nobre_empresa` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `logros` varchar(300) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oferta`
--

CREATE TABLE `oferta` (
  `id_oferta` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `nombre_principal` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `prioridad` int(11) NOT NULL,
  `id_carrera` int(11) NOT NULL,
  `salario` int(11) DEFAULT NULL,
  `condiciones` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otros_cursos`
--

CREATE TABLE `otros_cursos` (
  `id_otros_cursos` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `fecha_grado` date DEFAULT NULL,
  `titulo` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `institucion` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otros_lenguajes`
--

CREATE TABLE `otros_lenguajes` (
  `id_otro_lenguaje` int(11) NOT NULL,
  `id_estudiante` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `lenguaje` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `porcentaje` int(30) NOT NULL,
  `institucion` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `referencia`
--

CREATE TABLE `referencia` (
  `id_ref` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `nombre_ref` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `telefono_ref` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `cargo_ref` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `referencia`
--

INSERT INTO `referencia` (`id_ref`, `id_estudiante`, `nombre_ref`, `telefono_ref`, `cargo_ref`) VALUES
(5, 1, 'jk', 'lj', 'lkj');

-- --------------------------------------------------------

--
-- Table structure for table `telefono`
--

CREATE TABLE `telefono` (
  `id_telefono` int(11) NOT NULL,
  `telefono` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `id_estudiante` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `celular`
--
ALTER TABLE `celular`
  ADD PRIMARY KEY (`id_NoCelular`);

--
-- Indexes for table `conocimientos`
--
ALTER TABLE `conocimientos`
  ADD PRIMARY KEY (`id_conocimiento`) USING BTREE;

--
-- Indexes for table `correo`
--
ALTER TABLE `correo`
  ADD PRIMARY KEY (`id_correo`);

--
-- Indexes for table `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indexes for table `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id_estudiante`);

--
-- Indexes for table `estudios_basicos`
--
ALTER TABLE `estudios_basicos`
  ADD PRIMARY KEY (`id_estudio`);

--
-- Indexes for table `experiencia`
--
ALTER TABLE `experiencia`
  ADD PRIMARY KEY (`id_experiencia`);

--
-- Indexes for table `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`id_oferta`);

--
-- Indexes for table `otros_cursos`
--
ALTER TABLE `otros_cursos`
  ADD PRIMARY KEY (`id_otros_cursos`);

--
-- Indexes for table `otros_lenguajes`
--
ALTER TABLE `otros_lenguajes`
  ADD PRIMARY KEY (`id_otro_lenguaje`) USING BTREE;

--
-- Indexes for table `referencia`
--
ALTER TABLE `referencia`
  ADD PRIMARY KEY (`id_ref`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `celular`
--
ALTER TABLE `celular`
  MODIFY `id_NoCelular` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `conocimientos`
--
ALTER TABLE `conocimientos`
  MODIFY `id_conocimiento` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `correo`
--
ALTER TABLE `correo`
  MODIFY `id_correo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `estudios_basicos`
--
ALTER TABLE `estudios_basicos`
  MODIFY `id_estudio` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `experiencia`
--
ALTER TABLE `experiencia`
  MODIFY `id_experiencia` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `oferta`
--
ALTER TABLE `oferta`
  MODIFY `id_oferta` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `otros_cursos`
--
ALTER TABLE `otros_cursos`
  MODIFY `id_otros_cursos` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `otros_lenguajes`
--
ALTER TABLE `otros_lenguajes`
  MODIFY `id_otro_lenguaje` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `referencia`
--
ALTER TABLE `referencia`
  MODIFY `id_ref` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
