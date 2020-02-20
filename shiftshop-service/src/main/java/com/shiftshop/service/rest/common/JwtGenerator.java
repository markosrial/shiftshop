package com.shiftshop.service.rest.common;

public interface JwtGenerator {

	String generate(JwtInfo info);

	JwtInfo getInfo(String token);

}
