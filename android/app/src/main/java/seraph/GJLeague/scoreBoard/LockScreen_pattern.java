package seraph.GJLeague.scoreBoard;

import static android.content.ContentValues.TAG;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
import android.widget.ImageView;
import android.widget.Toast;


import com.andrognito.pinlockview.IndicatorDots;
import com.andrognito.pinlockview.PinLockListener;
import com.andrognito.pinlockview.PinLockView;

import java.util.List;

import io.paperdb.Paper;

public class LockScreen_pattern extends AppCompatActivity {
    private ImageView profileimage;

    private PinLockView mPinLockView;
    private IndicatorDots mIndicatorDots;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lock_screen_pattern);
        profileimage = findViewById(R.id.profile_image);
        int randomImage = randomGenerator(4);
        if(randomImage==1)
            profileimage.setImageResource(R.drawable.flight);
        else if (randomImage ==2)
            profileimage.setImageResource(R.drawable.flight1);
        else if (randomImage ==3)
            profileimage.setImageResource(R.drawable.flight2);
        else if (randomImage ==0)
            profileimage.setImageResource(R.drawable.flight);
        else if (randomImage ==4)
            profileimage.setImageResource(R.drawable.flight2);

        mPinLockView = (PinLockView) findViewById(R.id.pin_lock_view);
        mIndicatorDots = findViewById(R.id.indicator_dots);

        mPinLockView.attachIndicatorDots(mIndicatorDots);
        mPinLockView.setPinLength(4);

        mPinLockView.setPinLockListener(new PinLockListener() {
            @Override
            public void onComplete(String pin) {
                Log.d(TAG, "lock code: " + pin);
                if (pin.equals("2025")) {
                    Intent intent = new Intent(LockScreen_pattern.this, MainActivity.class);
                    intent.putExtra("userType", "Play_Console_Test");
                    startActivity(intent);
                    finish();
                }
                else if (pin.equals("1955")) {
                    Intent intent = new Intent(LockScreen_pattern.this, MainActivity.class);
                    intent.putExtra("userType", "ZionUser");
                    startActivity(intent);
                    finish();
                } else  {
                    Toast.makeText(LockScreen_pattern.this, "Invalid Password", Toast.LENGTH_SHORT).show();
                    mPinLockView.resetPinLockView();
                }
            }

            @Override
            public void onEmpty() {
                Log.d(TAG, "Please enter Password!");
            }

            @Override
            public void onPinChange(int pinLength, String intermediatePin) {
                Vibrator vibe = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    vibe.vibrate(VibrationEffect.createOneShot(100, VibrationEffect.DEFAULT_AMPLITUDE));
                } else {
                    vibe.vibrate(100); // deprecated after Android 8.0
                }

                Log.d(TAG, "Pin changed, new length " + pinLength + " with intermediate pin " + intermediatePin);
            }
        });



    }
    public int randomGenerator(int max ){

        return (int)(Math.random()*(max-1+1)+1);
    }





}