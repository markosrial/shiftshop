package com.shiftshop.service.rest.common;

import com.shiftshop.service.model.entities.User.RoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final String MANAGER = RoleType.MANAGER.name();
	private final String ADMIN = RoleType.ADMIN.name();
	private final String SALESMAN = RoleType.SALESMAN.name();

	@Autowired
	private JwtGenerator jwtGenerator;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.cors().and().csrf().disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.addFilter(new JwtFilter(authenticationManager(), jwtGenerator))
				.authorizeRequests()
				.antMatchers("/users/login").permitAll()
				.antMatchers("/users/loginFromServiceToken").permitAll()
				.antMatchers(HttpMethod.POST, "/catalog/categories").hasRole(ADMIN)
				.antMatchers(HttpMethod.PUT, "/catalog/categories").hasRole(ADMIN)
				.antMatchers("/catalog/**").hasAnyRole(MANAGER, ADMIN, SALESMAN)
				.antMatchers("/**").hasRole(MANAGER);

	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {

		CorsConfiguration config = new CorsConfiguration();
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

		config.setAllowCredentials(true);
	    config.addAllowedOrigin("*");
	    config.addAllowedHeader("*");
	    config.addAllowedMethod("*");

	    source.registerCorsConfiguration("/**", config);

	    return source;

	 }

}
