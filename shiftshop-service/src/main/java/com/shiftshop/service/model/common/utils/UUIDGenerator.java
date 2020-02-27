package com.shiftshop.service.model.common.utils;

import com.google.common.io.BaseEncoding;
import org.springframework.stereotype.Component;

import java.nio.ByteBuffer;
import java.util.UUID;

@Component
public class UUIDGenerator {

    private final BaseEncoding encoder;

    public UUIDGenerator() {
        this.encoder = BaseEncoding.base32();
    }

    public String randomId() {

        // Create random UUID
        UUID uuid = UUID.randomUUID();

        // Create byte[] for base32 from uuid
        byte[] src = ByteBuffer.wrap(new byte[16])
                .putLong(uuid.getMostSignificantBits())
                .putLong(uuid.getLeastSignificantBits())
                .array();

        // Encode to Base32 and remove trailing ==
        return encoder.encode(src).substring(0, 26);
    }

}
