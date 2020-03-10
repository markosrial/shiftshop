package com.shiftshop.service.rest.common;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtGeneratorImpl implements JwtGenerator {

	@Value("${project.jwt.signKey}")
	private String signKey;

	@Value("${project.jwt.expirationMinutes}")
	private long expirationMinutes;

	@Override
	public String generate(JwtInfo info) {

		Claims claims = Jwts.claims();

		claims.setSubject(info.getUserName())
				.setExpiration(new Date(System.currentTimeMillis() + expirationMinutes * 60 * 1000));
		claims.put("userId", info.getUserId());
		claims.put("roles", info.getRoles());

		return Jwts.builder().setClaims(claims)
	        .signWith(SignatureAlgorithm.HS512, signKey.getBytes())
	        .compact();

	}

	@Override
	public JwtInfo getInfo(String token) {

		Claims claims = Jwts.parser()
	        .setSigningKey(signKey.getBytes())
	        .parseClaimsJws(token)
	        .getBody();

		return new JwtInfo(
				((Integer) claims.get("userId")).longValue(),
				claims.getSubject(),
				((List<String>) claims.get("roles")).stream().collect(Collectors.toSet()));

	}

}
